import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { createMockBusinessUser, createMockInvestorUser, getCurrentUser } from '../src/services/authService';

const TestRoleSwitching = () => {
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [token, setToken] = useState<string | null>(null);

  const checkStatus = () => {
    const user = getCurrentUser();
    const userToken = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    setCurrentUser(user);
    setToken(userToken);
  };

  useEffect(() => {
    checkStatus();
    
    // Listen for user changes
    const handleUserChange = () => {
      console.log('User changed, updating status...');
      checkStatus();
    };

    window.addEventListener('userChanged', handleUserChange);
    window.addEventListener('storage', handleUserChange);

    return () => {
      window.removeEventListener('userChanged', handleUserChange);
      window.removeEventListener('storage', handleUserChange);
    };
  }, []);

  const handleBusinessSwitch = () => {
    createMockBusinessUser();
    setTimeout(checkStatus, 100);
  };

  const handleInvestorSwitch = () => {
    createMockInvestorUser();
    setTimeout(checkStatus, 100);
  };

  const handleClearData = () => {
    if (typeof window !== 'undefined') {
      localStorage.clear();
    }
    setTimeout(checkStatus, 100);
  };

  return (
    <>
      <Head>
        <title>Test Role Switching - SME Crowdfunding</title>
      </Head>

      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            🧪 Test Role Switching
          </h1>

          {/* Current Status */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Current Status</h2>
            {currentUser ? (
              <div className="space-y-2">
                <p><strong>Name:</strong> {currentUser.name}</p>
                <p><strong>Email:</strong> {currentUser.email}</p>
                <p><strong>Role:</strong> {currentUser.role}</p>
                <p><strong>User Type:</strong> {currentUser.userType}</p>
                <p><strong>Token:</strong> {token ? 'Present' : 'Missing'}</p>
                <p><strong>ID:</strong> {currentUser.id}</p>
              </div>
            ) : (
              <p className="text-gray-500">No user logged in</p>
            )}
            <button
              onClick={checkStatus}
              className="mt-4 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded"
            >
              Refresh Status
            </button>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
            <div className="space-y-4">
              <button
                onClick={handleBusinessSwitch}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded font-medium"
              >
                🏢 Switch to Business User
              </button>
              <button
                onClick={handleInvestorSwitch}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded font-medium"
              >
                💰 Switch to Investor User
              </button>
              <button
                onClick={handleClearData}
                className="w-full bg-red-600 hover:bg-red-700 text-white py-3 px-4 rounded font-medium"
              >
                🗑️ Clear All Data
              </button>
            </div>
          </div>

          {/* Dashboard Links */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Dashboard Links</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <a
                href="/dashboard/business"
                target="_blank"
                className="block bg-blue-600 hover:bg-blue-700 text-white text-center py-3 px-4 rounded font-medium"
              >
                🏢 Open Business Dashboard
              </a>
              <a
                href="/dashboard/investor"
                target="_blank"
                className="block bg-green-600 hover:bg-green-700 text-white text-center py-3 px-4 rounded font-medium"
              >
                💰 Open Investor Dashboard
              </a>
            </div>
          </div>

          {/* Instructions */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mt-6">
            <h3 className="text-lg font-semibold text-yellow-800 mb-2">Test Instructions</h3>
            <ul className="text-yellow-700 space-y-1">
              <li>1. Switch to Business User và mở Business Dashboard</li>
              <li>2. Switch to Investor User và mở Investor Dashboard</li>
              <li>3. Kiểm tra xem dashboard có load đúng role không</li>
              <li>4. Test việc switch giữa các role mà không cần logout</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default TestRoleSwitching;