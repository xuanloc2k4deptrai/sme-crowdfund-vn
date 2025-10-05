import express from 'express';
import cors from 'cors';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Minimal Payment Server is running',
    timestamp: new Date().toISOString()
  });
});

// Provider status endpoint
app.get('/api/secure-payments/providers/status', (req, res) => {
  res.json({
    vnpay: true,
    momo: true,
    zalopay: true,
    vietqr: true,
    stripe: true
  });
});

// Initiate payment endpoint
app.post('/api/secure-payments/secure-payment/initiate', (req, res) => {
  const { amount, paymentMethod, campaignId, userInfo } = req.body;
  
  const transactionId = 'TXN_' + Date.now();
  const paymentUrl = `https://mock-${paymentMethod}.com/pay?id=${transactionId}&amount=${amount}`;
  
  res.json({
    success: true,
    transactionId,
    paymentUrl,
    message: 'Payment initiated successfully'
  });
});

// Verify payment endpoint
app.get('/api/secure-payments/secure-payment/verify/:transactionId', (req, res) => {
  const { transactionId } = req.params;
  
  res.json({
    status: 'completed',
    transactionId,
    message: 'Payment completed successfully'
  });
});

const PORT = parseInt(process.env.PAYMENT_PORT || '5000', 10);

app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Minimal Payment Server running on http://localhost:${PORT}`);
  console.log(`📊 Health: http://localhost:${PORT}/health`);
  console.log(`💳 API: http://localhost:${PORT}/api/secure-payments`);
}).on('error', (err: any) => {
  console.error('❌ Server error:', err);
  process.exit(1);
});
