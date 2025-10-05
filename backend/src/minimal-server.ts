import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
  console.log('✅ Health check called');
  res.json({ status: 'OK', message: 'Minimal server working' });
});

app.get('/api/secure-payments/providers/status', (req, res) => {
  console.log('✅ Provider status called');
  res.json({
    vnpay: true,
    momo: true,
    zalopay: true,
    vietqr: true,
    stripe: true
  });
});

app.post('/api/secure-payments/initiate', (req, res) => {
  console.log('✅ Payment initiate called:', req.body);
  const transactionId = 'TXN_' + Date.now();
  res.json({
    success: true,
    transactionId,
    paymentUrl: `https://sandbox.vnpayment.vn/paymentv2/vpcpay.html?vnp_TxnRef=${transactionId}`,
    message: 'Payment initiated successfully'
  });
});

app.get('/api/secure-payments/verify/:transactionId', (req, res) => {
  console.log('✅ Payment verify called:', req.params.transactionId);
  res.json({
    status: 'completed',
    transactionId: req.params.transactionId,
    message: 'Payment completed successfully'
  });
});

app.listen(PORT, () => {
  console.log(`\n🚀 Minimal Payment Server running on port ${PORT}`);
  console.log(`📊 Test: http://localhost:${PORT}/health\n`);
}).on('error', (err: any) => {
  console.error('❌ Server error:', err);
  if (err.code === 'EADDRINUSE') {
    console.error(`Port ${PORT} is already in use!`);
  }
  process.exit(1);
});
