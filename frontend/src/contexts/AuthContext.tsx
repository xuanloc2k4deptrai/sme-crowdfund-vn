import React, { createContext, useContext, useState, useEffect } from 'react';
import { loginUser, registerUser, logoutUser, getCurrentUser } from '../services/authService';

interface User {
  id: number;
  email: string;
  name: string;
  role: string;
  userType?: string; // 'investor' hoặc 'business'
}

interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, userType?: string) => Promise<void>;
  logout: () => void;
  error: string | null;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check if user is already logged in
    const savedUser = getCurrentUser();
    if (savedUser) {
      setUser(savedUser);
    }
    setIsLoading(false);

    // Listen for localStorage changes (including from other tabs or direct localStorage updates)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'user') {
        const newUser = getCurrentUser();
        console.log('AuthContext: localStorage changed, updating user:', newUser);
        setUser(newUser);
      }
    };

    // Listen for custom event when user is updated via authService functions
    const handleUserChange = () => {
      const newUser = getCurrentUser();
      console.log('AuthContext: user change event, updating user:', newUser);
      setUser(newUser);
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('userChanged', handleUserChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('userChanged', handleUserChange);
    };
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await loginUser({ email, password });
      setUser(response.user);
    } catch (err: any) {
      setError(err.message || 'Login failed');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string, userType?: string) => {
    try {
      setIsLoading(true);
      setError(null);
      console.log('Registering user with:', { name, email, userType }); // Debug log
      const response = await registerUser({ name, email, password, role: userType });
      console.log('Registration response:', response); // Debug log
      setUser(response.user);
      console.log('User set in context:', response.user); // Debug log
    } catch (err: any) {
      console.error('Registration error in context:', err); // Debug log
      setError(err.message || 'Registration failed');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    logoutUser();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{
      user,
      isLoggedIn: !!user,
      isLoading,
      login,
      register,
      logout,
      error
    }}>
      {children}
    </AuthContext.Provider>
  );
};

// Note: useAuth hook is now imported from '../hooks/useAuth'

// But also export useAuth directly from here for compatibility
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};