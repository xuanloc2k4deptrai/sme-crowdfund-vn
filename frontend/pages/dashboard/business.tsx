import React, { useEffect, useState, useContext } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { AuthContext } from '../../src/contexts/AuthContext';
import { EnhancedBusinessDashboard } from '../../src/components/business/EnhancedBusinessDashboard';
import { AIBusinessDashboard } from '../../src/components/business/AIBusinessDashboard';

const BusinessDashboard = () => {
  const auth = useContext(AuthContext);
  const { user, isLoggedIn } = auth || { user: null, isLoggedIn: false };
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'enhanced' | 'classic'>('enhanced');

  useEffect(() => {
    if (!isLoggedIn || !user) {
      router.replace('/login');
    } else if (user.role !== 'business' && user.userType !== 'business') {
      if (user.role === 'investor' || user.userType === 'investor') {
        router.replace('/dashboard/investor');
      } else {
        router.replace('/dashboard');
      }
    } else {
      setLoading(false);
    }
  }, [isLoggedIn, user, router]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Đang tải dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Business Dashboard - SME Crowdfunding</title>
        <meta name="description" content="Dashboard doanh nghiệp" />
      </Head>
      
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white border-b px-4 py-3">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <div className="flex space-x-2">
              <button
                onClick={() => setViewMode('enhanced')}
                className={`px-4 py-2 rounded-lg font-medium text-sm ${
                  viewMode === 'enhanced'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                🏢 Dashboard Nâng cao
              </button>
              <button
                onClick={() => setViewMode('classic')}
                className={`px-4 py-2 rounded-lg font-medium text-sm ${
                  viewMode === 'classic'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                🤖 Dashboard AI
              </button>
            </div>
            <div className="text-sm text-gray-600">
              Chào mừng, <span className="font-medium">{user?.name || user?.email}</span>
            </div>
          </div>
        </div>
        
        {viewMode === 'enhanced' ? (
          <EnhancedBusinessDashboard user={user} />
        ) : (
          <AIBusinessDashboard user={user} />
        )}
      </div>
    </>
  );
};

export default BusinessDashboard;