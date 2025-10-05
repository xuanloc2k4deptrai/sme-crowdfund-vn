import express from 'express';
import cors from 'cors';
import securePaymentRoutes from './routes/securePaymentRoutes';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/secure-payments', securePaymentRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Secure Payment Server is running' });
});

const PORT = parseInt(process.env.PAYMENT_PORT || '5000', 10);

const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Secure Payment Server running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
  console.log(`💳 Payment API: http://localhost:${PORT}/api/secure-payments`);
}).on('error', (err: any) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`❌ Port ${PORT} is already in use. Please try a different port.`);
    process.exit(1);
  } else {
    console.error('❌ Server error:', err);
  }
});

export default app;