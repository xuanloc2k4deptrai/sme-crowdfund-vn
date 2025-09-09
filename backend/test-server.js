const express = require('express');
const app = express();
const PORT = 5000;

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Simple test server is working' });
});

app.listen(PORT, () => {
  console.log(`Test server running on http://localhost:${PORT}`);
  console.log(`Health: http://localhost:${PORT}/api/health`);
});
