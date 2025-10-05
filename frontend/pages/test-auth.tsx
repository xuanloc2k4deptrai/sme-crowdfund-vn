import { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

export default function TestAuthPage() {
  const router = useRouter();
  const [currentRole, setCurrentRole] = useState<'business' | 'investor' | null>(null);

  const switchRole = (role: 'business' | 'investor') => {
    setCurrentRole(role);
    
    // Create a mock user object for testing
    const mockUser = {
      id: 1,
      email: `test-${role}@example.com`,
      name: `Test ${role.charAt(0).toUpperCase() + role.slice(1)} User`,
      role: role,
      userType: role
    };
    
    // Store both userRole and user object for compatibility
    localStorage.setItem('userRole', role);
    localStorage.setItem('user', JSON.stringify(mockUser));
    localStorage.setItem('isLoggedIn', 'true');
    
    // Trigger storage event for AuthContext
    window.dispatchEvent(new StorageEvent('storage', {
      key: 'user',
      newValue: JSON.stringify(mockUser),
      storageArea: localStorage
    }));
    
    // Also trigger custom event that AuthContext might be listening for
    window.dispatchEvent(new Event('userChange'));
    
    // Small delay to ensure context updates
    setTimeout(() => {
      router.push(`/dashboard`);
    }, 100);
  };

  return (
    <>
      <Head>
        <title>Test Auth Hub - SME Crowdfunding</title>
        <meta name="description" content="Test authentication and role switching" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Test Auth Hub</h1>
            <p className="text-gray-600">Switch between user roles for testing</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
            <div className="text-center">
              <p className="text-sm text-gray-500 mb-4">Current Role: 
                <span className="font-medium text-blue-600 ml-1">
                  {currentRole || 'None'}
                </span>
              </p>
            </div>

            <button
              onClick={() => switchRole('business')}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
            >
              <span className="text-lg">🏢</span>
              Switch to Business User
            </button>

            <button
              onClick={() => switchRole('investor')}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
            >
              <span className="text-lg">💰</span>
              Switch to Investor User
            </button>

            <div className="pt-4 border-t border-gray-200">
              <button
                onClick={() => router.push('/')}
                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-lg transition-colors duration-200"
              >
                ← Back to Homepage
              </button>
            </div>
          </div>

          <div className="mt-8 text-center">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h3 className="text-sm font-medium text-yellow-800 mb-2">Developer Note</h3>
              <p className="text-xs text-yellow-700">
                This page is for testing role switching functionality. 
                It sets the user role in localStorage and redirects to the appropriate dashboard.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}