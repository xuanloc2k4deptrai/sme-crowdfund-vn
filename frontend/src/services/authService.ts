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
    userType?: string;
  };
}

export const registerUser = async (userData: RegisterData): Promise<AuthResponse> => {
  try {
    // For development without a backend, use mock data
    if (process.env.NODE_ENV === 'development' && !process.env.NEXT_PUBLIC_USE_API) {
      console.log('Using mock registration with userData:', userData);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const userRole = userData.role || 'investor';
      
      // Create mock response
      const mockResponse: AuthResponse = {
        token: 'mock-jwt-token-' + Math.random().toString(36).substr(2, 9),
        user: {
          id: Math.floor(Math.random() * 1000),
          email: userData.email,
          name: userData.name,
          role: userRole,
          userType: userRole
        }
      };
      
      console.log('Mock registration response:', mockResponse);
      
      // Store in localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('token', mockResponse.token);
        localStorage.setItem('user', JSON.stringify(mockResponse.user));
        
        // Also store in a list of registered users for login lookup
        const existingUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
        const newUser = {
          id: mockResponse.user.id,
          email: mockResponse.user.email,
          name: mockResponse.user.name,
          role: mockResponse.user.role
        };
        existingUsers.push(newUser);
        localStorage.setItem('registeredUsers', JSON.stringify(existingUsers));
        console.log('Stored user in registeredUsers:', newUser);
      }
      
      return mockResponse;
    }
    
    // Normal API call
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
    // For development without a backend, use mock data
    if (process.env.NODE_ENV === 'development' && !process.env.NEXT_PUBLIC_USE_API) {
      console.log('Using mock login with credentials:', credentials);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Check if there's already a registered user in localStorage with this email
      const existingUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
      const existingUser = existingUsers.find((u: any) => u.email === credentials.email);
      
      let role = 'investor'; // Default
      
      if (existingUser) {
        role = existingUser.role;
        console.log('Found existing user with role:', role);
      } else {
        // Determine role based on email pattern for easier testing
        if (credentials.email.includes('business') || credentials.email.includes('company') || credentials.email.includes('startup')) {
          role = 'business';
        }
        console.log('Determined role from email pattern:', role);
      }
      
      // Create mock response
      const mockResponse: AuthResponse = {
        token: 'mock-jwt-token-' + Math.random().toString(36).substr(2, 9),
        user: {
          id: existingUser?.id || Math.floor(Math.random() * 1000),
          email: credentials.email,
          name: existingUser?.name || credentials.email.split('@')[0],
          role: role,
          userType: role
        }
      };
      
      console.log('Mock login response:', mockResponse);
      
      // Store in localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('token', mockResponse.token);
        localStorage.setItem('user', JSON.stringify(mockResponse.user));
      }
      
      return mockResponse;
    }
    
    // Normal API call
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
    // Keep registeredUsers for future logins unless specifically cleared
    
    // Dispatch custom event to notify AuthContext
    window.dispatchEvent(new CustomEvent('userChanged'));
  }
  // Don't use window.location.href as it causes a full page reload
  // Navigation should be handled by the component using router.push
};

export const getCurrentUser = (): { id: number; email: string; name: string; role: string; userType?: string } | null => {
  if (typeof window !== 'undefined') {
    const userString = localStorage.getItem('user');
    if (userString) {
      return JSON.parse(userString);
    }
  }
  return null;
};

// Helper function for testing - create mock business user
export const createMockBusinessUser = (): void => {
  if (typeof window !== 'undefined') {
    const mockBusinessUser = {
      id: 2001,
      email: 'business@company.com',
      name: 'Business User',
      role: 'business',
      userType: 'business'
    };
    
    // Ensure this business user is in registered users
    const existingUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    const businessUserExists = existingUsers.find((u: any) => u.email === mockBusinessUser.email);
    
    if (!businessUserExists) {
      existingUsers.push({
        id: mockBusinessUser.id,
        email: mockBusinessUser.email,
        name: mockBusinessUser.name,
        role: mockBusinessUser.role
      });
      localStorage.setItem('registeredUsers', JSON.stringify(existingUsers));
      console.log('Added business user to registeredUsers');
    }
    
    localStorage.setItem('token', 'mock-business-token-' + Math.random().toString(36).substr(2, 9));
    localStorage.setItem('user', JSON.stringify(mockBusinessUser));
    console.log('Switched to business user:', mockBusinessUser);
    
    // Dispatch custom event to notify AuthContext
    window.dispatchEvent(new CustomEvent('userChanged'));
  }
};

// Helper function for testing - create mock investor user
export const createMockInvestorUser = (): void => {
  if (typeof window !== 'undefined') {
    const mockInvestorUser = {
      id: 1001,
      email: 'investor@example.com',
      name: 'Investor User',
      role: 'investor',
      userType: 'investor'
    };
    
    // Ensure this investor user is in registered users
    const existingUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    const investorUserExists = existingUsers.find((u: any) => u.email === mockInvestorUser.email);
    
    if (!investorUserExists) {
      existingUsers.push({
        id: mockInvestorUser.id,
        email: mockInvestorUser.email,
        name: mockInvestorUser.name,
        role: mockInvestorUser.role
      });
      localStorage.setItem('registeredUsers', JSON.stringify(existingUsers));
      console.log('Added investor user to registeredUsers');
    }
    
    localStorage.setItem('token', 'mock-investor-token-' + Math.random().toString(36).substr(2, 9));
    localStorage.setItem('user', JSON.stringify(mockInvestorUser));
    console.log('Switched to investor user:', mockInvestorUser);
    
    // Dispatch custom event to notify AuthContext
    window.dispatchEvent(new CustomEvent('userChanged'));
  }
};

export const isAuthenticated = (): boolean => {
  if (typeof window !== 'undefined') {
    return !!localStorage.getItem('token');
  }
  return false;
};

// Initialize mock users for testing
export const initializeMockUsers = (): void => {
  if (typeof window !== 'undefined') {
    const existingUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    
    const businessUser = {
      id: 2001,
      email: 'business@company.com',
      name: 'Business User',
      role: 'business'
    };
    
    const investorUser = {
      id: 1001,
      email: 'investor@example.com',
      name: 'Investor User',
      role: 'investor'
    };
    
    // Add business user if not exists
    if (!existingUsers.find((u: any) => u.email === businessUser.email)) {
      existingUsers.push(businessUser);
    }
    
    // Add investor user if not exists
    if (!existingUsers.find((u: any) => u.email === investorUser.email)) {
      existingUsers.push(investorUser);
    }
    
    localStorage.setItem('registeredUsers', JSON.stringify(existingUsers));
    console.log('Initialized mock users:', existingUsers);
  }
};

// Switch to existing business user
export const switchToBusinessUser = (): void => {
  if (typeof window !== 'undefined') {
    initializeMockUsers(); // Ensure users exist
    
    const existingUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    const businessUser = existingUsers.find((u: any) => u.role === 'business');
    
    if (businessUser) {
      const fullBusinessUser = {
        ...businessUser,
        userType: 'business'
      };
      
      localStorage.setItem('token', 'mock-business-token-' + Math.random().toString(36).substr(2, 9));
      localStorage.setItem('user', JSON.stringify(fullBusinessUser));
      console.log('Switched to existing business user:', fullBusinessUser);
      
      // Dispatch custom event to notify AuthContext
      window.dispatchEvent(new CustomEvent('userChanged'));
    } else {
      console.error('No business user found in registered users');
      createMockBusinessUser(); // Fallback
    }
  }
};

// Switch to existing investor user
export const switchToInvestorUser = (): void => {
  if (typeof window !== 'undefined') {
    initializeMockUsers(); // Ensure users exist
    
    const existingUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    const investorUser = existingUsers.find((u: any) => u.role === 'investor');
    
    if (investorUser) {
      const fullInvestorUser = {
        ...investorUser,
        userType: 'investor'
      };
      
      localStorage.setItem('token', 'mock-investor-token-' + Math.random().toString(36).substr(2, 9));
      localStorage.setItem('user', JSON.stringify(fullInvestorUser));
      console.log('Switched to existing investor user:', fullInvestorUser);
      
      // Dispatch custom event to notify AuthContext
      window.dispatchEvent(new CustomEvent('userChanged'));
    } else {
      console.error('No investor user found in registered users');
      createMockInvestorUser(); // Fallback
    }
  }
};
