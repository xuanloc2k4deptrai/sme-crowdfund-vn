// Secure Payment Service với các công nghệ thanh toán hiện đại
import CryptoJS from 'crypto-js';
import axios from 'axios';

export interface PaymentProvider {
  id: string;
  name: string;
  type: 'digital_wallet' | 'bank_transfer' | 'crypto' | 'card' | 'qr_code';
  icon: string;
  supportedCurrencies: string[];
  fees: {
    fixed: number;
    percentage: number;
  };
  processingTime: string;
  maxAmount: number;
  minAmount: number;
  isActive: boolean;
  securityLevel: 'high' | 'medium' | 'standard';
}

export interface SecurePaymentData {
  campaignId: number;
  amount: number;
  currency: string;
  paymentProviderId: string;
  investorId: number;
  deviceFingerprint?: string;
  ipAddress?: string;
  userAgent?: string;
  // Dữ liệu bảo mật
  encryptedData?: string;
  signature?: string;
  timestamp: number;
  nonce: string;
}

export interface PaymentResult {
  transactionId: string;
  status: 'pending' | 'processing' | 'completed' | 'failed' | 'cancelled';
  paymentUrl?: string;
  qrCode?: string;
  expiresAt: Date;
  fees: {
    platform: number;
    gateway: number;
    total: number;
  };
  estimatedCompletion: Date;
  securityVerification: {
    riskScore: number;
    verificationRequired: boolean;
    methods: string[];
  };
}

class SecurePaymentService {
  private readonly apiUrl: string;
  private readonly encryptionKey: string;
  private readonly apiKey: string;

  constructor() {
    this.apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
    this.encryptionKey = process.env.NEXT_PUBLIC_ENCRYPTION_KEY || 'default-key';
    this.apiKey = process.env.NEXT_PUBLIC_PAYMENT_API_KEY || 'default-api-key';
  }

  // Các nhà cung cấp thanh toán được hỗ trợ
  private getPaymentProviders(): PaymentProvider[] {
    return [
      {
        id: 'vnpay',
        name: 'VNPay',
        type: 'digital_wallet',
        icon: '/icons/vnpay.svg',
        supportedCurrencies: ['VND'],
        fees: { fixed: 0, percentage: 2.2 },
        processingTime: 'Tức thì',
        maxAmount: 500000000, // 500M VND
        minAmount: 10000, // 10K VND
        isActive: true,
        securityLevel: 'high'
      },
      {
        id: 'momo',
        name: 'MoMo',
        type: 'digital_wallet',
        icon: '/icons/momo.svg',
        supportedCurrencies: ['VND'],
        fees: { fixed: 0, percentage: 1.5 },
        processingTime: 'Tức thì',
        maxAmount: 100000000, // 100M VND
        minAmount: 5000,
        isActive: true,
        securityLevel: 'high'
      },
      {
        id: 'zalopay',
        name: 'ZaloPay',
        type: 'digital_wallet',
        icon: '/icons/zalopay.svg',
        supportedCurrencies: ['VND'],
        fees: { fixed: 0, percentage: 1.8 },
        processingTime: 'Tức thì',
        maxAmount: 50000000,
        minAmount: 5000,
        isActive: true,
        securityLevel: 'high'
      },
      {
        id: 'vietqr',
        name: 'VietQR',
        type: 'qr_code',
        icon: '/icons/vietqr.svg',
        supportedCurrencies: ['VND'],
        fees: { fixed: 0, percentage: 0.5 },
        processingTime: '1-5 phút',
        maxAmount: 1000000000,
        minAmount: 1000,
        isActive: true,
        securityLevel: 'high'
      },
      {
        id: 'bank_transfer',
        name: 'Chuyển khoản ngân hàng',
        type: 'bank_transfer',
        icon: '/icons/bank.svg',
        supportedCurrencies: ['VND'],
        fees: { fixed: 0, percentage: 0.1 },
        processingTime: '30 phút - 24 giờ',
        maxAmount: 10000000000,
        minAmount: 50000,
        isActive: true,
        securityLevel: 'medium'
      },
      {
        id: 'visa_mastercard',
        name: 'Visa/Mastercard',
        type: 'card',
        icon: '/icons/cards.svg',
        supportedCurrencies: ['VND', 'USD'],
        fees: { fixed: 5000, percentage: 3.0 },
        processingTime: 'Tức thì',
        maxAmount: 200000000,
        minAmount: 10000,
        isActive: true,
        securityLevel: 'high'
      },
      {
        id: 'crypto_btc',
        name: 'Bitcoin',
        type: 'crypto',
        icon: '/icons/bitcoin.svg',
        supportedCurrencies: ['BTC', 'USD'],
        fees: { fixed: 0, percentage: 1.0 },
        processingTime: '10-60 phút',
        maxAmount: 1000000000,
        minAmount: 100000,
        isActive: false, // Tạm thời tắt
        securityLevel: 'high'
      },
      {
        id: 'crypto_eth',
        name: 'Ethereum',
        type: 'crypto',
        icon: '/icons/ethereum.svg',
        supportedCurrencies: ['ETH', 'USD'],
        fees: { fixed: 0, percentage: 1.2 },
        processingTime: '5-30 phút',
        maxAmount: 1000000000,
        minAmount: 50000,
        isActive: false, // Tạm thời tắt
        securityLevel: 'high'
      }
    ];
  }

  // Mã hóa dữ liệu nhạy cảm
  private encryptSensitiveData(data: any): string {
    const jsonString = JSON.stringify(data);
    return CryptoJS.AES.encrypt(jsonString, this.encryptionKey).toString();
  }

  // Giải mã dữ liệu
  private decryptSensitiveData(encryptedData: string): any {
    const bytes = CryptoJS.AES.decrypt(encryptedData, this.encryptionKey);
    const decryptedString = bytes.toString(CryptoJS.enc.Utf8);
    return JSON.parse(decryptedString);
  }

  // Tạo chữ ký bảo mật
  private generateSignature(data: any): string {
    const dataString = JSON.stringify(data);
    return CryptoJS.HmacSHA256(dataString, this.apiKey).toString();
  }

  // Tạo device fingerprint
  private generateDeviceFingerprint(): string {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    ctx!.textBaseline = 'top';
    ctx!.font = '14px Arial';
    ctx!.fillText('Device fingerprint', 2, 2);
    
    const fingerprint = {
      screen: `${screen.width}x${screen.height}`,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      language: navigator.language,
      platform: navigator.platform,
      canvas: canvas.toDataURL(),
      userAgent: navigator.userAgent.slice(0, 100) // Giới hạn độ dài
    };
    
    return CryptoJS.MD5(JSON.stringify(fingerprint)).toString();
  }

  // Đánh giá rủi ro giao dịch
  private assessRiskScore(paymentData: SecurePaymentData): number {
    let riskScore = 0;
    
    // Kiểm tra số tiền
    if (paymentData.amount > 100000000) riskScore += 30; // > 100M VND
    else if (paymentData.amount > 50000000) riskScore += 20; // > 50M VND
    else if (paymentData.amount > 10000000) riskScore += 10; // > 10M VND
    
    // Kiểm tra thời gian (giao dịch ngoài giờ)
    const hour = new Date().getHours();
    if (hour < 6 || hour > 22) riskScore += 15;
    
    // Kiểm tra device fingerprint mới
    const storedFingerprints = localStorage.getItem('trusted_devices');
    if (!storedFingerprints || !storedFingerprints.includes(paymentData.deviceFingerprint || '')) {
      riskScore += 25;
    }
    
    return Math.min(riskScore, 100);
  }

  // Lấy danh sách nhà cung cấp thanh toán
  public getAvailableProviders(amount: number, currency: string = 'VND'): PaymentProvider[] {
    return this.getPaymentProviders().filter(provider => 
      provider.isActive &&
      provider.supportedCurrencies.includes(currency) &&
      amount >= provider.minAmount &&
      amount <= provider.maxAmount
    );
  }

  // Tính phí giao dịch
  public calculateFees(amount: number, providerId: string): { platform: number; gateway: number; total: number } {
    const provider = this.getPaymentProviders().find(p => p.id === providerId);
    if (!provider) throw new Error('Provider not found');
    
    const gatewayFee = provider.fees.fixed + (amount * provider.fees.percentage / 100);
    const platformFee = amount * 0.005; // 0.5% phí nền tảng
    
    return {
      platform: Math.round(platformFee),
      gateway: Math.round(gatewayFee),
      total: Math.round(platformFee + gatewayFee)
    };
  }

  // Khởi tạo thanh toán bảo mật
  public async initiateSecurePayment(paymentData: Omit<SecurePaymentData, 'timestamp' | 'nonce' | 'deviceFingerprint'>): Promise<PaymentResult> {
    try {
      // Thêm thông tin bảo mật
      const secureData: SecurePaymentData = {
        ...paymentData,
        timestamp: Date.now(),
        nonce: CryptoJS.lib.WordArray.random(16).toString(),
        deviceFingerprint: this.generateDeviceFingerprint(),
        ipAddress: await this.getClientIP(),
        userAgent: navigator.userAgent
      };

      // Đánh giá rủi ro
      const riskScore = this.assessRiskScore(secureData);
      
      // Mã hóa dữ liệu nhạy cảm
      const encryptedData = this.encryptSensitiveData({
        campaignId: secureData.campaignId,
        amount: secureData.amount,
        investorId: secureData.investorId
      });

      // Tạo chữ ký
      const signature = this.generateSignature(secureData);

      // Tính phí
      const fees = this.calculateFees(secureData.amount, secureData.paymentProviderId);

      const requestData = {
        ...secureData,
        encryptedData,
        signature,
        fees
      };

      const response = await axios.post(`${this.apiUrl}/payments/secure-initiate`, requestData, {
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': this.apiKey,
          'X-Request-ID': CryptoJS.lib.WordArray.random(16).toString(),
          'X-Timestamp': secureData.timestamp.toString()
        }
      });

      const result: PaymentResult = {
        ...response.data,
        securityVerification: {
          riskScore,
          verificationRequired: riskScore > 50,
          methods: riskScore > 50 ? ['sms', 'email'] : riskScore > 30 ? ['email'] : []
        }
      };

      return result;

    } catch (error: any) {
      console.error('Secure payment initiation failed:', error);
      throw new Error(error.response?.data?.message || 'Khởi tạo thanh toán thất bại');
    }
  }

  // Xác thực thanh toán với OTP/2FA
  public async verifyPayment(transactionId: string, verificationCode: string, method: 'sms' | 'email' | 'totp'): Promise<{ success: boolean; message: string }> {
    try {
      const response = await axios.post(`${this.apiUrl}/payments/verify`, {
        transactionId,
        verificationCode,
        method,
        timestamp: Date.now()
      }, {
        headers: {
          'X-API-Key': this.apiKey
        }
      });

      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Xác thực thanh toán thất bại');
    }
  }

  // Kiểm tra trạng thái thanh toán
  public async getPaymentStatus(transactionId: string): Promise<PaymentResult> {
    try {
      const response = await axios.get(`${this.apiUrl}/payments/status/${transactionId}`, {
        headers: {
          'X-API-Key': this.apiKey
        }
      });

      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Không thể lấy trạng thái thanh toán');
    }
  }

  // Hủy thanh toán
  public async cancelPayment(transactionId: string, reason: string): Promise<{ success: boolean; message: string }> {
    try {
      const response = await axios.post(`${this.apiUrl}/payments/cancel`, {
        transactionId,
        reason,
        timestamp: Date.now()
      }, {
        headers: {
          'X-API-Key': this.apiKey
        }
      });

      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Hủy thanh toán thất bại');
    }
  }

  // Hoàn tiền
  public async requestRefund(transactionId: string, reason: string, amount?: number): Promise<{ success: boolean; refundId: string; message: string }> {
    try {
      const response = await axios.post(`${this.apiUrl}/payments/refund`, {
        transactionId,
        reason,
        amount, // Nếu không có thì hoàn toàn bộ
        timestamp: Date.now()
      }, {
        headers: {
          'X-API-Key': this.apiKey
        }
      });

      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Yêu cầu hoàn tiền thất bại');
    }
  }

  // Lấy IP của client
  private async getClientIP(): Promise<string> {
    try {
      const response = await axios.get('https://api.ipify.org?format=json');
      return response.data.ip;
    } catch {
      return '0.0.0.0';
    }
  }

  // Lưu thiết bị tin cậy
  public trustDevice(fingerprint: string): void {
    const trustedDevices = JSON.parse(localStorage.getItem('trusted_devices') || '[]');
    if (!trustedDevices.includes(fingerprint)) {
      trustedDevices.push(fingerprint);
      localStorage.setItem('trusted_devices', JSON.stringify(trustedDevices));
    }
  }

  // Kiểm tra thiết bị tin cậy
  public isTrustedDevice(fingerprint: string): boolean {
    const trustedDevices = JSON.parse(localStorage.getItem('trusted_devices') || '[]');
    return trustedDevices.includes(fingerprint);
  }
}

export const securePaymentService = new SecurePaymentService();