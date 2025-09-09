const http = require('http');

console.log('🔍 Testing backend API...');

// Test health endpoint
const options = {
  hostname: 'localhost',
  port: 5000,
  path: '/api/health',
  method: 'GET',
  headers: {
    'Content-Type': 'application/json'
  }
};

const req = http.request(options, (res) => {
  console.log(`✅ Response Status: ${res.statusCode}`);
  console.log(`📋 Headers:`, res.headers);
  
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  
  res.on('end', () => {
    console.log('📨 Response Body:', data);
    try {
      const parsed = JSON.parse(data);
      console.log('✨ Parsed JSON:', parsed);
    } catch (e) {
      console.log('⚠️ Could not parse as JSON');
    }
  });
});

req.on('error', (error) => {
  console.error('❌ Request failed:', error.message);
});

req.end();

console.log('🚀 Request sent...');
