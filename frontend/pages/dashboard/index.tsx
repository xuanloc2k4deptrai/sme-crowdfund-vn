import React, { useEffect, useState, useContext } from 'react';
import { useRouter } from 'next/router';
import { AuthContext } from '../../contexts/AuthContext';

const DashboardPage = () => {
  const auth = useContext(AuthContext);
  const { user, isLoggedIn } = auth || { user: null, isLoggedIn: false };
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    if (isLoggedIn && user) {
      // Redirect based on user role
      if (user.role === 'investor') {
        router.replace('/dashboard/investor');
      } else if (user.role === 'business') {
        router.replace('/dashboard/business');
      } else {
        // Default fallback - show role selection or generic dashboard
        setLoading(false);
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
          <p className="text-gray-600">Đang chuyển hướng...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
        <p className="text-gray-600 mb-8">Không thể xác định loại tài khoản. Vui lòng liên hệ hỗ trợ.</p>
        <div className="space-x-4">
          <button 
            onClick={() => router.push('/dashboard/investor')}
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
          >
            Trang Nhà Đầu Tư
          </button>
          <button 
            onClick={() => router.push('/dashboard/business')}
            className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700"
          >
            Trang Doanh Nghiệp
          </button>
        </div>
      </div>
    </div>
  );
};

// Disable SSG for this page to avoid build errors
export async function getServerSideProps() {
  return {
    props: {},
  };
}

export default DashboardPage;