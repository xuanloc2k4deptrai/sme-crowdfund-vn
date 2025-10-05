import axios from 'axios';

const SECURE_PAYMENT_API_BASE = 'http://localhost:5000/api';

export interface PaymentRequest {
  campaignId: number;
  amount: number;
  currency: 'VND';
  paymentMethod: 'vnpay' | 'momo' | 'zalopay' | 'vietqr' | 'stripe';
  userInfo: {
    userId: string;
    email: string;
    name: string;
  };
  deviceFingerprint?: string;
}

export interface PaymentResponse {
  success: boolean;
  transactionId: string;
  paymentUrl?: string;
  qrCode?: string;
  message: string;
  encryptedData?: string;
}

export interface DeviceFingerprint {
  userAgent: string;
  screen: string;
  timezone: string;
  language: string;
  platform: string;
  cookieEnabled: boolean;
  doNotTrack: string;
  timestamp: number;
  hash: string;
}

class SecurePaymentClient {
  private apiClient = axios.create({
    baseURL: SECURE_PAYMENT_API_BASE,
    timeout: 30000,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  constructor() {
    // Add request interceptor for authentication
    this.apiClient.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('authToken');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Add response interceptor for error handling
    this.apiClient.interceptors.response.use(
      (response) => response,
      (error) => {
        console.error('Secure Payment API Error:', error);
        return Promise.reject(error);
      }
    );
  }

  // Generate device fingerprint
  generateDeviceFingerprint(): DeviceFingerprint {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    ctx!.textBaseline = 'top';
    ctx!.font = '14px Arial';
    ctx!.fillText('Device fingerprint', 2, 2);
    
    const fingerprint = {
      userAgent: navigator.userAgent,
      screen: `${screen.width}x${screen.height}`,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      language: navigator.language,
      platform: navigator.platform,
      cookieEnabled: navigator.cookieEnabled,
      doNotTrack: navigator.doNotTrack || 'unknown',
      timestamp: Date.now(),
      hash: btoa(canvas.toDataURL()).slice(0, 32)
    };

    return fingerprint;
  }

  // Initiate payment
  async initiatePayment(paymentRequest: PaymentRequest): Promise<PaymentResponse> {
    try {
      const deviceFingerprint = this.generateDeviceFingerprint();
      const response = await this.apiClient.post('/secure-payment/initiate', {
        ...paymentRequest,
        deviceFingerprint: JSON.stringify(deviceFingerprint)
      });
      
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Payment initiation failed');
    }
  }

  // Verify payment
  async verifyPayment(transactionId: string): Promise<{ success: boolean; status: string; message: string }> {
    try {
      const response = await this.apiClient.get(`/secure-payment/verify/${transactionId}`);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Payment verification failed');
    }
  }

  // Get payment history
  async getPaymentHistory(userId: string): Promise<any[]> {
    try {
      const response = await this.apiClient.get(`/secure-payment/history/${userId}`);
      return response.data.transactions || [];
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to fetch payment history');
    }
  }

  // Check payment provider status
  async getProviderStatus(): Promise<Record<string, boolean>> {
    try {
      const response = await this.apiClient.get('/secure-payment/providers/status');
      return response.data.providers || {};
    } catch (error: any) {
      console.warn('Failed to fetch provider status:', error);
      return {
        vnpay: true,
        momo: true,
        zalopay: true,
        vietqr: true,
        stripe: true
      };
    }
  }

  // Health check
  async healthCheck(): Promise<boolean> {
    try {
      const response = await this.apiClient.get('/health');
      return response.status === 200;
    } catch (error) {
      return false;
    }
  }
}

export const securePaymentClient = new SecurePaymentClient();
export default securePaymentClient;