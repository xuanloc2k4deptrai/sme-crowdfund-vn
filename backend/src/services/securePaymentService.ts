import crypto from 'crypto';
import axios from 'axios';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export interface SecureTransaction {
  id: string;
  campaignId: number;
  investorId: number;
  amount: number;
  currency: string;
  providerId: string;
  status: 'pending' | 'processing' | 'completed' | 'failed' | 'cancelled' | 'refunded';
  paymentUrl?: string;
  qrCode?: string;
  expiresAt: Date;
  fees: {
    platform: number;
    gateway: number;
    total: number;
  };
  securityInfo: {
    riskScore: number;
    deviceFingerprint: string;
    ipAddress: string;
    userAgent: string;
    verificationRequired: boolean;
    verificationMethods: string[];
    verificationStatus: 'none' | 'pending' | 'verified' | 'failed';
  };
  metadata: {
    createdAt: Date;
    updatedAt: Date;
    attemptCount: number;
    lastAttemptAt?: Date;
  };
}

export interface PaymentProvider {
  id: string;
  name: string;
  type: string;
  config: {
    apiUrl: string;
    apiKey: string;
    secretKey: string;
    webhookSecret: string;
  };
  isActive: boolean;
  fees: {
    fixed: number;
    percentage: number;
  };
  limits: {
    min: number;
    max: number;
    daily: number;
  };
}

class SecurePaymentServiceBackend {
  private readonly encryptionKey: string;
  private readonly apiKey: string;
  private readonly webhookSecret: string;

  constructor() {
    this.encryptionKey = process.env.ENCRYPTION_KEY || 'your-encryption-key';
    this.apiKey = process.env.PAYMENT_API_KEY || 'your-api-key';
    this.webhookSecret = process.env.WEBHOOK_SECRET || 'your-webhook-secret';
  }

  // Các nhà cung cấp thanh toán
  private getPaymentProviders(): PaymentProvider[] {
    return [
      {
        id: 'vnpay',
        name: 'VNPay',
        type: 'digital_wallet',
        config: {
          apiUrl: 'https://sandbox-web.vnpay.vn/paymentv2/vpcpay.html',
          apiKey: process.env.VNPAY_API_KEY || '',
          secretKey: process.env.VNPAY_SECRET_KEY || '',
          webhookSecret: process.env.VNPAY_WEBHOOK_SECRET || ''
        },
        isActive: true,
        fees: { fixed: 0, percentage: 2.2 },
        limits: { min: 10000, max: 500000000, daily: 2000000000 }
      },
      {
        id: 'momo',
        name: 'MoMo',
        type: 'digital_wallet',
        config: {
          apiUrl: 'https://test-payment.momo.vn/v2/gateway/api/create',
          apiKey: process.env.MOMO_API_KEY || '',
          secretKey: process.env.MOMO_SECRET_KEY || '',
          webhookSecret: process.env.MOMO_WEBHOOK_SECRET || ''
        },
        isActive: true,
        fees: { fixed: 0, percentage: 1.5 },
        limits: { min: 5000, max: 100000000, daily: 500000000 }
      },
      {
        id: 'zalopay',
        name: 'ZaloPay',
        type: 'digital_wallet',
        config: {
          apiUrl: 'https://sb-openapi.zalopay.vn/v2/create',
          apiKey: process.env.ZALOPAY_API_KEY || '',
          secretKey: process.env.ZALOPAY_SECRET_KEY || '',
          webhookSecret: process.env.ZALOPAY_WEBHOOK_SECRET || ''
        },
        isActive: true,
        fees: { fixed: 0, percentage: 1.8 },
        limits: { min: 5000, max: 50000000, daily: 200000000 }
      },
      {
        id: 'vietqr',
        name: 'VietQR',
        type: 'qr_code',
        config: {
          apiUrl: 'https://api.vietqr.io/v2/generate',
          apiKey: process.env.VIETQR_API_KEY || '',
          secretKey: process.env.VIETQR_SECRET_KEY || '',
          webhookSecret: process.env.VIETQR_WEBHOOK_SECRET || ''
        },
        isActive: true,
        fees: { fixed: 0, percentage: 0.5 },
        limits: { min: 1000, max: 1000000000, daily: 10000000000 }
      },
      {
        id: 'visa_mastercard',
        name: 'Visa/Mastercard',
        type: 'card',
        config: {
          apiUrl: 'https://api.stripe.com/v1/payment_intents',
          apiKey: process.env.STRIPE_API_KEY || '',
          secretKey: process.env.STRIPE_SECRET_KEY || '',
          webhookSecret: process.env.STRIPE_WEBHOOK_SECRET || ''
        },
        isActive: true,
        fees: { fixed: 5000, percentage: 3.0 },
        limits: { min: 10000, max: 200000000, daily: 1000000000 }
      }
    ];
  }

  // Mã hóa dữ liệu nhạy cảm
  private encrypt(data: string): string {
    const cipher = crypto.createCipher('aes-256-cbc', this.encryptionKey);
    let encrypted = cipher.update(data, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
  }

  // Giải mã dữ liệu
  private decrypt(encryptedData: string): string {
    const decipher = crypto.createDecipher('aes-256-cbc', this.encryptionKey);
    let decrypted = decipher.update(encryptedData, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
  }

  // Tạo chữ ký bảo mật
  private generateSignature(data: any): string {
    const dataString = JSON.stringify(data);
    return crypto.createHmac('sha256', this.apiKey).update(dataString).digest('hex');
  }

  // Xác thực chữ ký
  private verifySignature(data: any, signature: string): boolean {
    const expectedSignature = this.generateSignature(data);
    return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSignature));
  }

  // Đánh giá rủi ro giao dịch nâng cao
  private async assessAdvancedRiskScore(transactionData: any): Promise<number> {
    let riskScore = 0;
    
    // 1. Kiểm tra số tiền bất thường
    if (transactionData.amount > 100000000) riskScore += 30;
    else if (transactionData.amount > 50000000) riskScore += 20;
    else if (transactionData.amount > 10000000) riskScore += 10;
    
    // 2. Kiểm tra thời gian giao dịch
    const hour = new Date().getHours();
    if (hour < 6 || hour > 22) riskScore += 15;
    
    // 3. Kiểm tra tần suất giao dịch của user
    const recentTransactions = await this.getRecentTransactionsByUser(transactionData.investorId, 24); // 24h
    if (recentTransactions.length > 10) riskScore += 25;
    else if (recentTransactions.length > 5) riskScore += 15;
    
    // 4. Kiểm tra IP và geolocation
    const ipRisk = await this.checkIPRisk(transactionData.ipAddress);
    riskScore += ipRisk;
    
    // 5. Kiểm tra device fingerprint mới
    const deviceRisk = await this.checkDeviceRisk(transactionData.deviceFingerprint, transactionData.investorId);
    riskScore += deviceRisk;
    
    // 6. Kiểm tra blacklist
    const blacklistRisk = await this.checkBlacklist(transactionData);
    riskScore += blacklistRisk;
    
    return Math.min(riskScore, 100);
  }

  // Kiểm tra rủi ro IP
  private async checkIPRisk(ipAddress: string): Promise<number> {
    try {
      // Kiểm tra IP có phải VPN/Proxy không
      const response = await axios.get(`https://ipapi.co/${ipAddress}/json/`);
      const data = response.data;
      
      let risk = 0;
      const ipData = data as any;
      if (ipData.country_code !== 'VN') risk += 20; // IP nước ngoài
      if (ipData.threat && ipData.threat.is_tor) risk += 50; // Tor network
      if (ipData.threat && ipData.threat.is_proxy) risk += 30; // Proxy
      if (ipData.threat && ipData.threat.is_anonymous) risk += 25; // Anonymous
      
      return risk;
    } catch {
      return 10; // Không thể kiểm tra IP
    }
  }

  // Kiểm tra rủi ro thiết bị
  private async checkDeviceRisk(fingerprint: string, userId: number): Promise<number> {
    try {
      // Kiểm tra xem device đã được sử dụng bởi user này chưa
      const existingDevice = await prisma.userDevice.findFirst({
        where: {
          fingerprint,
          userId
        }
      });
      
      if (existingDevice) {
        if (existingDevice.isTrusted) return 0;
        return 10; // Device đã biết nhưng chưa tin cậy
      }
      
      // Device mới hoàn toàn
      return 25;
    } catch {
      return 30;
    }
  }

  // Kiểm tra blacklist
  private async checkBlacklist(transactionData: any): Promise<number> {
    try {
      const blacklisted = await prisma.blacklist.findFirst({
        where: {
          OR: [
            { ipAddress: transactionData.ipAddress },
            { deviceFingerprint: transactionData.deviceFingerprint },
            { userId: transactionData.investorId }
          ]
        }
      });
      
      return blacklisted ? 100 : 0;
    } catch {
      return 0;
    }
  }

  // Lấy giao dịch gần đây của user
  private async getRecentTransactionsByUser(userId: number, hours: number): Promise<any[]> {
    const since = new Date(Date.now() - hours * 60 * 60 * 1000);
    
    try {
      return await prisma.transaction.findMany({
        where: {
          investorId: userId,
          createdAt: {
            gte: since
          }
        }
      });
    } catch {
      return [];
    }
  }

  // Khởi tạo giao dịch bảo mật
  public async initiateSecureTransaction(data: any): Promise<SecureTransaction> {
    try {
      // 1. Xác thực chữ ký
      if (!this.verifySignature(data, data.signature)) {
        throw new Error('Invalid signature');
      }

      // 2. Giải mã dữ liệu nhạy cảm
      const decryptedData = JSON.parse(this.decrypt(data.encryptedData));
      
      // 3. Đánh giá rủi ro
      const riskScore = await this.assessAdvancedRiskScore({
        ...decryptedData,
        ipAddress: data.ipAddress,
        deviceFingerprint: data.deviceFingerprint,
        investorId: decryptedData.investorId
      });

      // 4. Tạo transaction ID
      const transactionId = this.generateTransactionId();
      
      // 5. Lấy thông tin provider
      const provider = this.getPaymentProviders().find(p => p.id === data.paymentProviderId);
      if (!provider || !provider.isActive) {
        throw new Error('Payment provider not available');
      }

      // 6. Kiểm tra giới hạn
      if (decryptedData.amount < provider.limits.min || decryptedData.amount > provider.limits.max) {
        throw new Error('Amount exceeds provider limits');
      }

      // 7. Tạo URL thanh toán hoặc QR code
      const paymentInfo = await this.createPaymentUrl(provider, {
        ...decryptedData,
        transactionId,
        fees: data.fees
      });

      // 8. Lưu vào database
      const transaction: SecureTransaction = {
        id: transactionId,
        campaignId: decryptedData.campaignId,
        investorId: decryptedData.investorId,
        amount: decryptedData.amount,
        currency: data.currency,
        providerId: data.paymentProviderId,
        status: 'pending',
        paymentUrl: paymentInfo.paymentUrl,
        qrCode: paymentInfo.qrCode,
        expiresAt: new Date(Date.now() + 15 * 60 * 1000), // 15 phút
        fees: data.fees,
        securityInfo: {
          riskScore,
          deviceFingerprint: data.deviceFingerprint,
          ipAddress: data.ipAddress,
          userAgent: data.userAgent,
          verificationRequired: riskScore > 50,
          verificationMethods: riskScore > 50 ? ['sms', 'email'] : riskScore > 30 ? ['email'] : [],
          verificationStatus: riskScore > 50 ? 'pending' : 'none'
        },
        metadata: {
          createdAt: new Date(),
          updatedAt: new Date(),
          attemptCount: 0
        }
      };

      await this.saveTransaction(transaction);

      // 9. Gửi notification nếu cần xác thực
      if (riskScore > 30) {
        await this.sendSecurityNotification(transaction);
      }

      return transaction;

    } catch (error: any) {
      console.error('Secure transaction initiation failed:', error);
      throw new Error(error.message || 'Transaction initiation failed');
    }
  }

  // Tạo URL thanh toán cho từng provider
  private async createPaymentUrl(provider: PaymentProvider, transactionData: any): Promise<{ paymentUrl?: string; qrCode?: string }> {
    switch (provider.id) {
      case 'vnpay':
        return await this.createVNPayUrl(provider, transactionData);
      case 'momo':
        return await this.createMoMoUrl(provider, transactionData);
      case 'zalopay':
        return await this.createZaloPayUrl(provider, transactionData);
      case 'vietqr':
        return await this.createVietQRCode(provider, transactionData);
      case 'visa_mastercard':
        return await this.createStripeUrl(provider, transactionData);
      default:
        throw new Error(`Payment provider ${provider.id} not implemented`);
    }
  }

  // VNPay implementation
  private async createVNPayUrl(provider: PaymentProvider, data: any): Promise<{ paymentUrl: string }> {
    const vnp_TmnCode = provider.config.apiKey;
    const vnp_HashSecret = provider.config.secretKey;
    const vnp_Url = provider.config.apiUrl;
    const vnp_ReturnUrl = `${process.env.FRONTEND_URL}/payment/return`;
    
    const vnp_Params: Record<string, string> = {
      vnp_Version: '2.1.0',
      vnp_Command: 'pay',
      vnp_TmnCode,
      vnp_Amount: (data.amount * 100).toString(),
      vnp_CurrCode: 'VND',
      vnp_TxnRef: data.transactionId,
      vnp_OrderInfo: `Dau tu du an ${data.campaignId}`,
      vnp_OrderType: 'other',
      vnp_Locale: 'vn',
      vnp_ReturnUrl,
      vnp_IpAddr: data.ipAddress || '127.0.0.1',
      vnp_CreateDate: new Date().toISOString().replace(/[-:]/g, '').split('.')[0]
    };

    const sortedParams = Object.keys(vnp_Params).sort();
    const query = sortedParams.map(key => `${key}=${encodeURIComponent(vnp_Params[key])}`).join('&');
    const hmac = crypto.createHmac('sha512', vnp_HashSecret);
    const vnp_SecureHash = hmac.update(query, 'utf-8').digest('hex');
    
    const paymentUrl = `${vnp_Url}?${query}&vnp_SecureHash=${vnp_SecureHash}`;
    
    return { paymentUrl };
  }

  // MoMo implementation
  private async createMoMoUrl(provider: PaymentProvider, data: any): Promise<{ paymentUrl: string }> {
    const partnerCode = provider.config.apiKey;
    const accessKey = provider.config.secretKey;
    const secretKey = provider.config.webhookSecret;
    const requestId = data.transactionId;
    const orderId = data.transactionId;
    const orderInfo = `Đầu tư dự án ${data.campaignId}`;
    const redirectUrl = `${process.env.FRONTEND_URL}/payment/return`;
    const ipnUrl = `${process.env.BACKEND_URL}/api/payments/webhook/momo`;
    const amount = data.amount.toString();
    const requestType = 'captureWallet';
    const extraData = '';

    const rawSignature = `accessKey=${accessKey}&amount=${amount}&extraData=${extraData}&ipnUrl=${ipnUrl}&orderId=${orderId}&orderInfo=${orderInfo}&partnerCode=${partnerCode}&redirectUrl=${redirectUrl}&requestId=${requestId}&requestType=${requestType}`;
    const signature = crypto.createHmac('sha256', secretKey).update(rawSignature).digest('hex');

    const requestBody = {
      partnerCode,
      accessKey,
      requestId,
      amount,
      orderId,
      orderInfo,
      redirectUrl,
      ipnUrl,
      extraData,
      requestType,
      signature,
      lang: 'vi'
    };

    const response = await axios.post(provider.config.apiUrl, requestBody);
    
    return { paymentUrl: (response.data as any).payUrl };
  }

  // ZaloPay implementation
  private async createZaloPayUrl(provider: PaymentProvider, data: any): Promise<{ paymentUrl: string }> {
    const config = {
      app_id: provider.config.apiKey,
      key1: provider.config.secretKey,
      key2: provider.config.webhookSecret,
      endpoint: provider.config.apiUrl
    };

    const embed_data = JSON.stringify({
      redirecturl: `${process.env.FRONTEND_URL}/payment/return`
    });

    const items = JSON.stringify([{
      itemid: data.campaignId.toString(),
      itemname: `Đầu tư dự án ${data.campaignId}`,
      itemprice: data.amount,
      itemquantity: 1
    }]);

    const order: any = {
      app_id: config.app_id,
      app_trans_id: `${new Date().toISOString().slice(0, 10).replace(/-/g, '')}_${data.transactionId}`,
      app_user: data.investorId.toString(),
      app_time: Date.now(),
      item: items,
      embed_data: embed_data,
      amount: data.amount,
      description: `Đầu tư dự án ${data.campaignId}`,
      bank_code: '',
      callback_url: `${process.env.BACKEND_URL}/api/payments/webhook/zalopay`
    };

    const data_string = config.app_id + '|' + order.app_trans_id + '|' + order.app_user + '|' + order.amount + '|' + order.app_time + '|' + order.embed_data + '|' + order.item;
    order.mac = crypto.createHmac('sha256', config.key1).update(data_string).digest('hex');

    const response = await axios.post(config.endpoint, null, { params: order });
    
    return { paymentUrl: (response.data as any).order_url };
  }

  // VietQR implementation
  private async createVietQRCode(provider: PaymentProvider, data: any): Promise<{ qrCode: string }> {
    const requestBody = {
      accountNo: process.env.BANK_ACCOUNT_NUMBER,
      accountName: process.env.BANK_ACCOUNT_NAME,
      acqId: process.env.BANK_BIN_CODE,
      amount: data.amount,
      addInfo: `DT${data.campaignId} ${data.transactionId}`,
      format: 'text',
      template: 'compact'
    };

    const response = await axios.post(provider.config.apiUrl, requestBody, {
      headers: {
        'x-client-id': provider.config.apiKey,
        'x-api-key': provider.config.secretKey
      }
    });

    return { qrCode: (response.data as any).data.qrDataURL };
  }

  // Stripe implementation
  private async createStripeUrl(provider: PaymentProvider, data: any): Promise<{ paymentUrl: string }> {
    const stripe = require('stripe')(provider.config.secretKey);

    const paymentIntent = await stripe.paymentIntents.create({
      amount: data.amount,
      currency: 'vnd',
      metadata: {
        campaignId: data.campaignId.toString(),
        investorId: data.investorId.toString(),
        transactionId: data.transactionId
      },
      return_url: `${process.env.FRONTEND_URL}/payment/return`
    });

    return { paymentUrl: paymentIntent.client_secret };
  }

  // Tạo transaction ID
  private generateTransactionId(): string {
    const timestamp = Date.now().toString();
    const random = crypto.randomBytes(8).toString('hex');
    return `TXN_${timestamp}_${random}`.toUpperCase();
  }

  // Lưu transaction vào database
  private async saveTransaction(transaction: SecureTransaction): Promise<void> {
    try {
      await prisma.transaction.create({
        data: {
          id: transaction.id,
          campaignId: transaction.campaignId,
          investorId: transaction.investorId,
          amount: transaction.amount,
          currency: transaction.currency,
          providerId: transaction.providerId,
          status: transaction.status,
          paymentUrl: transaction.paymentUrl,
          qrCode: transaction.qrCode,
          expiresAt: transaction.expiresAt,
          platformFee: transaction.fees.platform,
          gatewayFee: transaction.fees.gateway,
          totalFee: transaction.fees.total,
          riskScore: transaction.securityInfo.riskScore,
          deviceFingerprint: transaction.securityInfo.deviceFingerprint,
          ipAddress: transaction.securityInfo.ipAddress,
          userAgent: transaction.securityInfo.userAgent,
          verificationRequired: transaction.securityInfo.verificationRequired,
          verificationMethods: transaction.securityInfo.verificationMethods.join(','),
          verificationStatus: transaction.securityInfo.verificationStatus
        }
      });
    } catch (error) {
      console.error('Failed to save transaction:', error);
      throw new Error('Failed to save transaction');
    }
  }

  // Gửi thông báo bảo mật
  private async sendSecurityNotification(transaction: SecureTransaction): Promise<void> {
    // Implementation for sending security notifications
    // This would integrate with your notification service
    console.log(`Security notification sent for transaction ${transaction.id}`);
  }

  // Xác thực giao dịch với OTP/2FA
  public async verifyTransaction(transactionId: string, verificationCode: string, method: string): Promise<{ success: boolean; message: string }> {
    try {
      const transaction = await prisma.transaction.findUnique({
        where: { id: transactionId }
      });

      if (!transaction) {
        throw new Error('Transaction not found');
      }

      if (transaction.verificationStatus === 'verified') {
        return { success: false, message: 'Transaction already verified' };
      }

      // Verify the code based on method
      const isValid = await this.validateVerificationCode(transaction.investorId, verificationCode, method);
      
      if (isValid) {
        await prisma.transaction.update({
          where: { id: transactionId },
          data: { verificationStatus: 'verified' }
        });
        
        return { success: true, message: 'Transaction verified successfully' };
      } else {
        await prisma.transaction.update({
          where: { id: transactionId },
          data: { verificationStatus: 'failed' }
        });
        
        return { success: false, message: 'Invalid verification code' };
      }
    } catch (error: any) {
      return { success: false, message: error.message };
    }
  }

  // Validate verification code
  private async validateVerificationCode(userId: number, code: string, method: string): Promise<boolean> {
    // Implementation for validating verification codes
    // This would integrate with your OTP/2FA service
    return true; // Placeholder
  }

  // Webhook handler cho các provider
  public async handleWebhook(provider: string, data: any, signature: string): Promise<void> {
    switch (provider) {
      case 'vnpay':
        await this.handleVNPayWebhook(data, signature);
        break;
      case 'momo':
        await this.handleMoMoWebhook(data, signature);
        break;
      case 'zalopay':
        await this.handleZaloPayWebhook(data, signature);
        break;
      case 'stripe':
        await this.handleStripeWebhook(data, signature);
        break;
    }
  }

  private async handleVNPayWebhook(data: any, signature: string): Promise<void> {
    // VNPay webhook implementation
  }

  private async handleMoMoWebhook(data: any, signature: string): Promise<void> {
    // MoMo webhook implementation
  }

  private async handleZaloPayWebhook(data: any, signature: string): Promise<void> {
    // ZaloPay webhook implementation
  }

  private async handleStripeWebhook(data: any, signature: string): Promise<void> {
    // Stripe webhook implementation
  }
}

export const securePaymentServiceBackend = new SecurePaymentServiceBackend();