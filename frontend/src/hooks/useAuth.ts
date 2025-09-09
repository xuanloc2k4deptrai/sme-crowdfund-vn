import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

// Export as both named and default export for compatibility
export const useAuth = () => {
  const auth = useContext(AuthContext);
  
  if (!auth) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  
  return auth;
};

// Default export
export default useAuth;