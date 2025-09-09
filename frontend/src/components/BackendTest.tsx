import { useState, useEffect } from 'react';

export default function BackendTest() {
  const [status, setStatus] = useState('Checking...');
  const [error, setError] = useState('');

  const testBackend = async () => {
    try {
      console.log('Testing backend connection...');
      const response = await fetch('http://localhost:5000/api/health', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        setStatus(`✅ Backend connected: ${data.message || data.status}`);
        console.log('Backend response:', data);
      } else {
        setStatus(`❌ Backend error: ${response.status}`);
        setError(`HTTP ${response.status}: ${response.statusText}`);
      }
    } catch (err: any) {
      setStatus('❌ Backend unreachable');
      setError(err.message);
      console.error('Backend test error:', err);
    }
  };

  useEffect(() => {
    testBackend();
  }, []);

  return (
    <div style={{ 
      padding: '20px', 
      border: '2px solid #ddd', 
      borderRadius: '8px', 
      margin: '20px',
      backgroundColor: '#f9f9f9' 
    }}>
      <h3>🔌 Backend Connection Test</h3>
      <p><strong>Status:</strong> {status}</p>
      {error && <p style={{ color: 'red' }}><strong>Error:</strong> {error}</p>}
      <button 
        onClick={testBackend}
        style={{
          padding: '10px 20px',
          backgroundColor: '#0070f3',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        🔄 Test Again
      </button>
    </div>
  );
}
