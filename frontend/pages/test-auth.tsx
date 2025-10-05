import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { 
  createMockBusinessUser, 
  createMockInvestorUser, 
  switchToBusinessUser,
  switchToInvestorUser,
  initializeMockUsers,
  logoutUser 
} from '../src/services/authService';

const TestAuthPage = () => {
  const router = useRouter();
  const [switching, setSwitching] = useState(false);

  // Initialize mock users on component mount
  useEffect(() => {
    initializeMockUsers();
  }, []);

  const handleBusinessLogin = () => {
    setSwitching(true);
    switchToBusinessUser();
    // Add a small delay to ensure localStorage is updated before navigation
    setTimeout(() => {
      router.push('/dashboard/business');
    }, 100);
  };

  const handleInvestorLogin = () => {
    setSwitching(true);
    switchToInvestorUser();
    // Add a small delay to ensure localStorage is updated before navigation
    setTimeout(() => {
      router.push('/dashboard/investor');
    }, 100);
  };

  const handleLogout = () => {
    logoutUser();
    // Also clear any other localStorage items
    if (typeof window !== 'undefined') {
      localStorage.clear();
    }
    router.push('/');
  };

  const checkCurrentUser = () => {
    if (typeof window !== 'undefined') {
      const user = localStorage.getItem('user');
      const token = localStorage.getItem('token');
      const registeredUsers = localStorage.getItem('registeredUsers');
      console.log('Current user:', user);
      console.log('Current token:', token);
      console.log('Registered users:', registeredUsers);
      
      const userObj = user ? JSON.parse(user) : null;
      const regUsers = registeredUsers ? JSON.parse(registeredUsers) : [];
      
      alert(`Current User: ${userObj ? `${userObj.name} (${userObj.role})` : 'None'}\n\nRegistered Users: ${regUsers.length}\n${regUsers.map((u: any) => `- ${u.name} (${u.role})`).join('\n')}\n\nToken: ${token ? 'Present' : 'Missing'}`);
    }
  };

  const handleCreateBusinessUser = () => {
    createMockBusinessUser();
    alert('Created new business user!');
  };

  const handleCreateInvestorUser = () => {
    createMockInvestorUser();
    alert('Created new investor user!');
  };

  const clearAllData = () => {
    if (typeof window !== 'undefined') {
      localStorage.clear();
      alert('All localStorage data cleared!');
    }
  };

  return (
    <>
      <Head>
        <title>Test Authentication - SME Crowdfunding</title>
      </Head>

      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
          <h1 className="text-2xl font-bold text-gray-900 text-center mb-8">
            🧪 Test Authentication
          </h1>
          
          {switching && (
            <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-md">
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2"></div>
                <span className="text-blue-700 text-sm font-medium">Switching user...</span>
              </div>
            </div>
          )}
          
          <div className="space-y-4">
            <div className="text-sm font-medium text-gray-700 mb-2">
              🔄 Switch to Existing Users (Recommended)
            </div>
            
            <button
              onClick={handleBusinessLogin}
              disabled={switching}
              className={`w-full py-3 px-4 rounded-md font-medium transition-colors ${
                switching 
                  ? 'bg-gray-400 cursor-not-allowed text-gray-600' 
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
            >
              🏢 Switch to Business User
            </button>
            
            <button
              onClick={handleInvestorLogin}
              disabled={switching}
              className={`w-full py-3 px-4 rounded-md font-medium transition-colors ${
                switching 
                  ? 'bg-gray-400 cursor-not-allowed text-gray-600' 
                  : 'bg-green-600 hover:bg-green-700 text-white'
              }`}
            >
              💰 Switch to Investor User
            </button>

            <div className="border-t pt-4 mt-4">
              <div className="text-sm font-medium text-gray-700 mb-2">
                ➕ Create New Users (Testing)
              </div>
              
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={handleCreateBusinessUser}
                  className="py-2 px-3 bg-blue-500 hover:bg-blue-600 text-white text-sm rounded-md transition-colors"
                >
                  ➕ Create Business
                </button>
                
                <button
                  onClick={handleCreateInvestorUser}
                  className="py-2 px-3 bg-green-500 hover:bg-green-600 text-white text-sm rounded-md transition-colors"
                >
                  ➕ Create Investor
                </button>
              </div>
            </div>

            <div className="border-t pt-4 mt-4">
              <div className="text-sm font-medium text-gray-700 mb-2">
                🔍 Debug & Management
              </div>
              
              <div className="grid grid-cols-1 gap-2">
                <button
                  onClick={checkCurrentUser}
                  className="w-full bg-yellow-600 hover:bg-yellow-700 text-white py-2 px-4 rounded-md font-medium transition-colors"
                >
                  🔍 Check Current User
                </button>
                
                <button
                  onClick={handleLogout}
                  className="w-full bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md font-medium transition-colors"
                >
                  🚪 Logout & Clear All
                </button>

                <button
                  onClick={clearAllData}
                  className="w-full bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-md font-medium transition-colors"
                >
                  🗑️ Clear All Data
                </button>
              </div>
            </div>
          </div>

          <div className="mt-8 p-4 bg-gray-50 rounded-md">
            <h3 className="text-sm font-medium text-gray-900 mb-2">Test Instructions:</h3>
            <ul className="text-xs text-gray-600 space-y-1">
              <li>• Business User: Truy cập business dashboard với AI features</li>
              <li>• Investor User: Truy cập investor dashboard với AI features</li>
              <li>• Logout: Xóa authentication và quay về trang chủ</li>
            </ul>
          </div>

          <div className="mt-4 text-center">
            <button
              onClick={() => router.push('/')}
              className="text-blue-600 hover:text-blue-800 text-sm"
            >
              ← Quay về trang chủ
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default TestAuthPage;