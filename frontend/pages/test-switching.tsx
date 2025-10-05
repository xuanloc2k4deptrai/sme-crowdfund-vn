import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { 
  switchToBusinessUser, 
  switchToInvestorUser, 
  initializeMockUsers, 
  getCurrentUser 
} from '../src/services/authService';

const TestRoleSwitchingPage = () => {
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [registeredUsers, setRegisteredUsers] = useState<any[]>([]);

  useEffect(() => {
    initializeMockUsers();
    updateStatus();
    
    // Listen for user changes
    const handleUserChange = () => {
      updateStatus();
    };
    
    window.addEventListener('userChanged', handleUserChange);
    return () => window.removeEventListener('userChanged', handleUserChange);
  }, []);

  const updateStatus = () => {
    const user = getCurrentUser();
    setCurrentUser(user);
    
    if (typeof window !== 'undefined') {
      const registered = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
      setRegisteredUsers(registered);
    }
  };

  const handleSwitchToBusiness = () => {
    switchToBusinessUser();
    updateStatus();
  };

  const handleSwitchToInvestor = () => {
    switchToInvestorUser();
    updateStatus();
  };

  const handleClearData = () => {
    if (typeof window !== 'undefined') {
      localStorage.clear();
      setCurrentUser(null);
      setRegisteredUsers([]);
    }
  };

  return (
    <>
      <Head>
        <title>Test Role Switching - SME Crowdfunding</title>
      </Head>
      
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">🧪 Test SME Crowdfunding Role Switching</h1>
          
          {/* Current Status */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Current Status</h3>
            <div className="p-4 bg-gray-100 rounded-lg">
              {currentUser ? (
                <div>
                  <p><strong>Current User:</strong> {currentUser.name} ({currentUser.email})</p>
                  <p><strong>Role:</strong> {currentUser.role}</p>
                  <p><strong>User Type:</strong> {currentUser.userType}</p>
                  <p><strong>Registered Users:</strong> {registeredUsers.length} users</p>
                  <div className="mt-2">
                    <strong>Available Users:</strong>
                    <ul className="ml-4">
                      {registeredUsers.map((user, index) => (
                        <li key={index}>• {user.name} ({user.role})</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : (
                <p><strong>No user logged in</strong></p>
              )}
            </div>
            <button 
              onClick={updateStatus}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Refresh Status
            </button>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Quick Actions</h3>
            <div className="flex flex-wrap gap-4">
              <button 
                onClick={handleSwitchToBusiness}
                className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-medium"
              >
                🏢 Switch to Business
              </button>
              <button 
                onClick={handleSwitchToInvestor}
                className="px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 font-medium"
              >
                💰 Switch to Investor
              </button>
              <button 
                onClick={handleClearData}
                className="px-6 py-3 bg-red-600 text-white rounded-md hover:bg-red-700 font-medium"
              >
                🗑️ Clear Data
              </button>
            </div>
          </div>

          {/* Dashboard Links */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Dashboard Links</h3>
            <div className="flex flex-wrap gap-4">
              <a href="/dashboard/business" target="_blank" rel="noopener noreferrer">
                <button className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-medium">
                  Open Business Dashboard
                </button>
              </a>
              <a href="/dashboard/investor" target="_blank" rel="noopener noreferrer">
                <button className="px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 font-medium">
                  Open Investor Dashboard
                </button>
              </a>
              <a href="/test-auth" target="_blank" rel="noopener noreferrer">
                <button className="px-6 py-3 bg-purple-600 text-white rounded-md hover:bg-purple-700 font-medium">
                  Open Test Auth Page
                </button>
              </a>
            </div>
          </div>

          {/* Instructions */}
          <div className="bg-white rounded-lg shadow-md p-6 mt-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Test Instructions</h3>
            <ol className="list-decimal list-inside space-y-2 text-gray-700">
              <li>Click "Switch to Business" để chuyển thành business user</li>
              <li>Mở "Business Dashboard" để kiểm tra có load đúng business dashboard không</li>
              <li>Click "Switch to Investor" để chuyển thành investor user</li>
              <li>Mở "Investor Dashboard" để kiểm tra có load đúng investor dashboard không</li>
              <li>Test switching trực tiếp từ dashboard này sang dashboard khác</li>
            </ol>
          </div>
        </div>
      </div>
    </>
  );
};

export default TestRoleSwitchingPage;