import { Request, Response } from 'express';
import { securePaymentServiceBackend } from '../services/securePaymentService';
import { validatePaymentRequest, validateWebhookSignature } from '../middleware/paymentValidation';

class SecurePaymentController {
  
  // Khởi tạo thanh toán bảo mật
  public async initiateSecurePayment(req: Request, res: Response): Promise<void> {
    try {
      // Validate request
      const validation = validatePaymentRequest(req.body);
      if (!validation.isValid) {
        res.status(400).json({
          success: false,
          message: 'Invalid request data',
          errors: validation.errors
        });
        return;
      }

      // Rate limiting check
      const rateLimitKey = `payment_${req.ip}`;
      const attempts = await this.getRedisValue(rateLimitKey) || 0;
      if (attempts > 10) { // Max 10 attempts per hour
        res.status(429).json({
          success: false,
          message: 'Too many payment attempts. Please try again later.'
        });
        return;
      }

      // Increment rate limit counter
      await this.setRedisValue(rateLimitKey, attempts + 1, 3600); // 1 hour TTL

      // Process payment
      const transaction = await securePaymentServiceBackend.initiateSecureTransaction({
        ...req.body,
        ipAddress: req.ip,
        userAgent: req.get('User-Agent')
      });

      // Log transaction attempt
      console.log(`Payment initiated: ${transaction.id} by user ${transaction.investorId}`);

      res.status(200).json({
        success: true,
        data: {
          transactionId: transaction.id,
          status: transaction.status,
          paymentUrl: transaction.paymentUrl,
          qrCode: transaction.qrCode,
          expiresAt: transaction.expiresAt,
          fees: transaction.fees,
          securityVerification: {
            riskScore: transaction.securityInfo.riskScore,
            verificationRequired: transaction.securityInfo.verificationRequired,
            methods: transaction.securityInfo.verificationMethods
          }
        }
      });

    } catch (error: any) {
      console.error('Payment initiation error:', error);
      res.status(500).json({
        success: false,
        message: error.message || 'Internal server error'
      });
    }
  }

  // Xác thực thanh toán với OTP/2FA
  public async verifyPayment(req: Request, res: Response): Promise<void> {
    try {
      const { transactionId, verificationCode, method } = req.body;

      if (!transactionId || !verificationCode || !method) {
        res.status(400).json({
          success: false,
          message: 'Missing required fields'
        });
        return;
      }

      const result = await securePaymentServiceBackend.verifyTransaction(
        transactionId,
        verificationCode,
        method
      );

      if (result.success) {
        console.log(`Payment verified: ${transactionId}`);
      } else {
        console.log(`Payment verification failed: ${transactionId} - ${result.message}`);
      }

      res.status(200).json(result);

    } catch (error: any) {
      console.error('Payment verification error:', error);
      res.status(500).json({
        success: false,
        message: error.message || 'Verification failed'
      });
    }
  }

  // Lấy trạng thái thanh toán
  public async getPaymentStatus(req: Request, res: Response): Promise<void> {
    try {
      const { transactionId } = req.params;

      if (!transactionId) {
        res.status(400).json({
          success: false,
          message: 'Transaction ID is required'
        });
        return;
      }

      // Get transaction from database
      const transaction = await this.getTransactionFromDB(transactionId);
      
      if (!transaction) {
        res.status(404).json({
          success: false,
          message: 'Transaction not found'
        });
        return;
      }

      res.status(200).json({
        success: true,
        data: {
          transactionId: transaction.id,
          status: transaction.status,
          amount: transaction.amount,
          currency: transaction.currency,
          fees: {
            platform: transaction.platformFee,
            gateway: transaction.gatewayFee,
            total: transaction.totalFee
          },
          createdAt: transaction.createdAt,
          updatedAt: transaction.updatedAt,
          expiresAt: transaction.expiresAt
        }
      });

    } catch (error: any) {
      console.error('Get payment status error:', error);
      res.status(500).json({
        success: false,
        message: error.message || 'Failed to get payment status'
      });
    }
  }

  // Hủy thanh toán
  public async cancelPayment(req: Request, res: Response): Promise<void> {
    try {
      const { transactionId, reason } = req.body;

      if (!transactionId || !reason) {
        res.status(400).json({
          success: false,
          message: 'Transaction ID and reason are required'
        });
        return;
      }

      // Get transaction
      const transaction = await this.getTransactionFromDB(transactionId);
      
      if (!transaction) {
        res.status(404).json({
          success: false,
          message: 'Transaction not found'
        });
        return;
      }

      if (transaction.status !== 'pending' && transaction.status !== 'processing') {
        res.status(400).json({
          success: false,
          message: 'Cannot cancel transaction in current status'
        });
        return;
      }

      // Update transaction status
      await this.updateTransactionStatus(transactionId, 'cancelled', reason);

      console.log(`Payment cancelled: ${transactionId} - Reason: ${reason}`);

      res.status(200).json({
        success: true,
        message: 'Payment cancelled successfully'
      });

    } catch (error: any) {
      console.error('Cancel payment error:', error);
      res.status(500).json({
        success: false,
        message: error.message || 'Failed to cancel payment'
      });
    }
  }

  // Hoàn tiền
  public async processRefund(req: Request, res: Response): Promise<void> {
    try {
      const { transactionId, reason, amount } = req.body;

      if (!transactionId || !reason) {
        res.status(400).json({
          success: false,
          message: 'Transaction ID and reason are required'
        });
        return;
      }

      // Get transaction
      const transaction = await this.getTransactionFromDB(transactionId);
      
      if (!transaction) {
        res.status(404).json({
          success: false,
          message: 'Transaction not found'
        });
        return;
      }

      if (transaction.status !== 'completed') {
        res.status(400).json({
          success: false,
          message: 'Can only refund completed transactions'
        });
        return;
      }

      // Process refund with payment provider
      const refundResult = await this.processProviderRefund(transaction, amount || transaction.amount, reason);

      if (refundResult.success) {
        // Update transaction status
        await this.updateTransactionStatus(transactionId, 'refunded', reason);
        
        console.log(`Refund processed: ${transactionId} - Amount: ${amount || transaction.amount}`);

        res.status(200).json({
          success: true,
          refundId: refundResult.refundId,
          message: 'Refund processed successfully'
        });
      } else {
        res.status(500).json({
          success: false,
          message: refundResult.message || 'Refund processing failed'
        });
      }

    } catch (error: any) {
      console.error('Process refund error:', error);
      res.status(500).json({
        success: false,
        message: error.message || 'Failed to process refund'
      });
    }
  }

  // Webhook handlers for different payment providers
  public async handleVNPayWebhook(req: Request, res: Response): Promise<void> {
    try {
      const signature = req.get('X-VNPay-Signature');
      
      if (!signature || !validateWebhookSignature(req.body, signature, 'vnpay')) {
        res.status(401).json({ success: false, message: 'Invalid signature' });
        return;
      }

      await securePaymentServiceBackend.handleWebhook('vnpay', req.body, signature);

      res.status(200).json({ success: true });

    } catch (error) {
      console.error('VNPay webhook error:', error);
      res.status(500).json({ success: false });
    }
  }

  public async handleMoMoWebhook(req: Request, res: Response): Promise<void> {
    try {
      const signature = req.get('X-MoMo-Signature');
      
      if (!signature || !validateWebhookSignature(req.body, signature, 'momo')) {
        res.status(401).json({ success: false, message: 'Invalid signature' });
        return;
      }

      await securePaymentServiceBackend.handleWebhook('momo', req.body, signature);

      res.status(200).json({ success: true });

    } catch (error) {
      console.error('MoMo webhook error:', error);
      res.status(500).json({ success: false });
    }
  }

  public async handleZaloPayWebhook(req: Request, res: Response): Promise<void> {
    try {
      const signature = req.get('X-ZaloPay-Signature');
      
      if (!signature || !validateWebhookSignature(req.body, signature, 'zalopay')) {
        res.status(401).json({ success: false, message: 'Invalid signature' });
        return;
      }

      await securePaymentServiceBackend.handleWebhook('zalopay', req.body, signature);

      res.status(200).json({ success: true });

    } catch (error) {
      console.error('ZaloPay webhook error:', error);
      res.status(500).json({ success: false });
    }
  }

  public async handleStripeWebhook(req: Request, res: Response): Promise<void> {
    try {
      const signature = req.get('Stripe-Signature');
      
      if (!signature || !validateWebhookSignature(req.body, signature, 'stripe')) {
        res.status(401).json({ success: false, message: 'Invalid signature' });
        return;
      }

      await securePaymentServiceBackend.handleWebhook('stripe', req.body, signature);

      res.status(200).json({ success: true });

    } catch (error) {
      console.error('Stripe webhook error:', error);
      res.status(500).json({ success: false });
    }
  }

  // Payment analytics
  public async getPaymentAnalytics(req: Request, res: Response): Promise<void> {
    try {
      const { startDate, endDate, campaignId } = req.query;

      const analytics = await this.calculatePaymentAnalytics({
        startDate: startDate as string,
        endDate: endDate as string,
        campaignId: campaignId ? parseInt(campaignId as string) : undefined
      });

      res.status(200).json({
        success: true,
        data: analytics
      });

    } catch (error: any) {
      console.error('Payment analytics error:', error);
      res.status(500).json({
        success: false,
        message: error.message || 'Failed to get payment analytics'
      });
    }
  }

  // Security report
  public async getSecurityReport(req: Request, res: Response): Promise<void> {
    try {
      const { timeframe } = req.query;

      const securityReport = await this.generateSecurityReport(timeframe as string || '7d');

      res.status(200).json({
        success: true,
        data: securityReport
      });

    } catch (error: any) {
      console.error('Security report error:', error);
      res.status(500).json({
        success: false,
        message: error.message || 'Failed to generate security report'
      });
    }
  }

  // Helper methods
  private async getTransactionFromDB(transactionId: string): Promise<any> {
    // Implementation to get transaction from database
    // This would use Prisma or your database ORM
    return null; // Placeholder
  }

  private async updateTransactionStatus(transactionId: string, status: string, reason?: string): Promise<void> {
    // Implementation to update transaction status
    // This would use Prisma or your database ORM
  }

  private async processProviderRefund(transaction: any, amount: number, reason: string): Promise<any> {
    // Implementation to process refund with payment provider
    return { success: true, refundId: 'REFUND_' + Date.now() };
  }

  private async getRedisValue(key: string): Promise<any> {
    // Implementation to get value from Redis
    return null;
  }

  private async setRedisValue(key: string, value: any, ttl: number): Promise<void> {
    // Implementation to set value in Redis
  }

  private async calculatePaymentAnalytics(params: any): Promise<any> {
    // Implementation to calculate payment analytics
    return {
      totalTransactions: 0,
      totalAmount: 0,
      successRate: 0,
      averageAmount: 0,
      topProviders: [],
      riskScoreDistribution: {}
    };
  }

  private async generateSecurityReport(timeframe: string): Promise<any> {
    // Implementation to generate security report
    return {
      totalTransactions: 0,
      highRiskTransactions: 0,
      blockedTransactions: 0,
      fraudAttempts: 0,
      topRiskFactors: [],
      securityMetrics: {}
    };
  }

  // Lấy lịch sử thanh toán của user
  public async getPaymentHistory(req: Request, res: Response): Promise<void> {
    try {
      const { userId } = req.params;
      
      if (!userId) {
        res.status(400).json({
          success: false,
          message: 'User ID is required'
        });
        return;
      }

      // Mock payment history data
      const transactions = [
        {
          id: 'TXN_001',
          campaignId: 1,
          campaignName: 'TechStart Innovation',
          amount: 5000000,
          status: 'completed',
          paymentMethod: 'vnpay',
          createdAt: new Date(Date.now() - 86400000), // 1 day ago
          completedAt: new Date(Date.now() - 86000000)
        },
        {
          id: 'TXN_002',
          campaignId: 2,
          campaignName: 'EcoFarm Organic',
          amount: 3000000,
          status: 'completed',
          paymentMethod: 'momo',
          createdAt: new Date(Date.now() - 172800000), // 2 days ago
          completedAt: new Date(Date.now() - 172400000)
        }
      ];

      res.status(200).json({
        success: true,
        transactions
      });

    } catch (error) {
      console.error('Error fetching payment history:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }
}

export const securePaymentController = new SecurePaymentController();