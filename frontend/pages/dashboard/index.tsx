import React, { useEffect, useState, useContext } from 'react';
import { useRouter } from 'next/router';
import { AuthContext } from '../../src/contexts/AuthContext';

const DashboardPage = () => {
  const auth = useContext(AuthContext);
  const { user, isLoggedIn } = auth || { user: null, isLoggedIn: false };
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    console.log('Dashboard Index - User:', user);
    console.log('Dashboard Index - isLoggedIn:', isLoggedIn);
    
    if (!isLoggedIn || !user) {
      console.log('No user or not logged in, redirecting to login');
      router.replace('/login');
      return;
    }

    // Check userType first, then fall back to role for backward compatibility
    const userRole = user.userType || user.role;
    console.log('Dashboard Index - Determined userRole:', userRole);
    
    if (userRole === 'investor') {
      console.log('Redirecting to investor dashboard');
      router.replace('/dashboard/investor');
    } else if (userRole === 'business') {
      console.log('Redirecting to business dashboard');
      router.replace('/dashboard/business');
    } else {
      console.log('No valid role found, showing selection page');
      // No valid role found, show selection page
      setLoading(false);
    }
  }, [isLoggedIn, user, router]);
  
  if (loading || !user) {
    return (
      <div className="container mx-auto px-4 py-8 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Đang chuyển hướng...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8">
        <div className="text-center mb-8">
          <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-blue-100 mb-4">
            <svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Chọn loại tài khoản</h1>
          <p className="text-gray-600">Không thể xác định loại tài khoản của bạn. Vui lòng chọn:</p>
        </div>
        
        <div className="space-y-4">
          <button 
            onClick={() => router.push('/dashboard/investor')}
            className="w-full bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-md transition-colors flex items-center justify-center space-x-2"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
            </svg>
            <span>Dashboard Nhà Đầu Tư</span>
          </button>
          
          <button 
            onClick={() => router.push('/dashboard/business')}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md transition-colors flex items-center justify-center space-x-2"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            <span>Dashboard Doanh Nghiệp</span>
          </button>
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500 mb-4">
            Nếu bạn cần thay đổi loại tài khoản, vui lòng liên hệ hỗ trợ
          </p>
          <button 
            onClick={() => router.push('/logout')}
            className="text-red-600 hover:text-red-800 text-sm font-medium"
          >
            Đăng xuất
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;