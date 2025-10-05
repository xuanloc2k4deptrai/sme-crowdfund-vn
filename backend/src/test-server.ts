import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Test server is running' });
});

app.get('/api/test', (req, res) => {
  res.json({ message: 'API endpoint working' });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Test server listening on http://localhost:${PORT}`);
  console.log(`🔍 Health: http://localhost:${PORT}/health`);
}).on('error', (err: any) => {
  console.error('❌ Server error:', err);
  if (err.code === 'EADDRINUSE') {
    console.error(`Port ${PORT} is already in use`);
  }
  process.exit(1);
});
