import React, { useContext } from 'react';
import { useRouter } from 'next/router';
import { AuthContext } from '../../contexts/AuthContext';

interface PrivateRouteProps {
  children: React.ReactNode;
  adminOnly?: boolean;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ 
  children, 
  adminOnly = false 
}) => {
  const auth = useContext(AuthContext);
  const { isLoggedIn, user, isLoading } = auth || { isLoggedIn: false, user: null, isLoading: false };
  const router = useRouter();
  
  // Show loading indicator while checking auth status
  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }
  
  // Redirect to login if not authenticated
  if (!isLoggedIn) {
    if (typeof window !== 'undefined') {
      router.replace({
        pathname: '/login',
        query: { returnUrl: router.asPath }
      });
    }
    return null;
  }
  
  // Check admin access if required
  if (adminOnly && user?.role !== 'admin') {
    if (typeof window !== 'undefined') {
      router.replace('/');
    }
    return null;
  }
  
  return <>{children}</>;
};

export default PrivateRoute;
