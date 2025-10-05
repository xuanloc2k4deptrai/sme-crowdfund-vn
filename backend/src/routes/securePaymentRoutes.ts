import express from 'express';
import { securePaymentController } from '../controllers/securePaymentController';
import { authMiddleware } from '../middleware/authMiddleware';
import { rateLimitMiddleware } from '../middleware/rateLimitMiddleware';

const router = express.Router();

// Middleware bảo mật cho tất cả routes thanh toán
router.use('/payments', rateLimitMiddleware({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many payment requests, please try again later'
}));

// Routes cho thanh toán bảo mật
router.post('/secure-payment/initiate', 
  securePaymentController.initiateSecurePayment.bind(securePaymentController)
);

router.get('/secure-payment/verify/:transactionId',
  securePaymentController.verifyPayment.bind(securePaymentController)
);

router.get('/secure-payment/history/:userId',
  authMiddleware,
  securePaymentController.getPaymentHistory.bind(securePaymentController)
);

router.post('/payments/secure-initiate', 
  authMiddleware,
  securePaymentController.initiateSecurePayment.bind(securePaymentController)
);

router.post('/payments/verify',
  authMiddleware,
  securePaymentController.verifyPayment.bind(securePaymentController)
);

router.get('/payments/status/:transactionId',
  authMiddleware,
  securePaymentController.getPaymentStatus.bind(securePaymentController)
);

router.post('/payments/cancel',
  authMiddleware,
  securePaymentController.cancelPayment.bind(securePaymentController)
);

router.post('/payments/refund',
  authMiddleware,
  securePaymentController.processRefund.bind(securePaymentController)
);

// Webhook routes (không cần auth middleware)
router.post('/payments/webhook/vnpay',
  express.raw({ type: 'application/json' }),
  securePaymentController.handleVNPayWebhook.bind(securePaymentController)
);

router.post('/payments/webhook/momo',
  express.raw({ type: 'application/json' }),
  securePaymentController.handleMoMoWebhook.bind(securePaymentController)
);

router.post('/payments/webhook/zalopay',
  express.raw({ type: 'application/json' }),
  securePaymentController.handleZaloPayWebhook.bind(securePaymentController)
);

router.post('/payments/webhook/stripe',
  express.raw({ type: 'application/json' }),
  securePaymentController.handleStripeWebhook.bind(securePaymentController)
);

// Analytics và reporting routes
router.get('/payments/analytics',
  authMiddleware,
  securePaymentController.getPaymentAnalytics.bind(securePaymentController)
);

router.get('/payments/security-report',
  authMiddleware,
  securePaymentController.getSecurityReport.bind(securePaymentController)
);

// Provider status route (public endpoint)
router.get('/secure-payment/providers/status', (req, res) => {
  res.json({
    providers: {
      vnpay: true,
      momo: true,
      zalopay: true,
      vietqr: true,
      stripe: true
    }
  });
});

export default router;