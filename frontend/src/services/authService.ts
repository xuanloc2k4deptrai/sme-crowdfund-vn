import { apiClient } from './apiClient';

interface RegisterData {
  email: string;
  password: string;
  name: string;
  role?: string;
}

interface LoginData {
  email: string;
  password: string;
}

interface AuthResponse {
  token: string;
  user: {
    id: number;
    email: string;
    name: string;
    role: string;
  };
}

export const registerUser = async (userData: RegisterData): Promise<AuthResponse> => {
  try {
    const response = await apiClient.post('/auth/register', userData);
    
    // Store token and user info in localStorage after successful registration
    if (response.data.token && typeof window !== 'undefined') {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    
    return response.data;
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
};

export const loginUser = async (credentials: LoginData): Promise<AuthResponse> => {
  try {
    const response = await apiClient.post('/auth/login', credentials);
    
    // Store token and user info in localStorage
    if (response.data.token && typeof window !== 'undefined') {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    
    return response.data;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};

export const logoutUser = (): void => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
  // Don't use window.location.href as it causes a full page reload
  // Navigation should be handled by the component using router.push
};

export const getCurrentUser = (): { id: number; email: string; name: string; role: string } | null => {
  if (typeof window !== 'undefined') {
    const userString = localStorage.getItem('user');
    if (userString) {
      return JSON.parse(userString);
    }
  }
  return null;
};

export const isAuthenticated = (): boolean => {
  if (typeof window !== 'undefined') {
    return !!localStorage.getItem('token');
  }
  return false;
};
