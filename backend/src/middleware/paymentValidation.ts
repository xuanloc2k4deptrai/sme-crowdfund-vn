import crypto from 'crypto';

// Validation schemas and functions for payment requests
export interface PaymentValidationResult {
  isValid: boolean;
  errors: string[];
}

// Validate payment request data
export function validatePaymentRequest(data: any): PaymentValidationResult {
  const errors: string[] = [];

  // Required fields validation
  if (!data.campaignId || typeof data.campaignId !== 'number') {
    errors.push('Campaign ID is required and must be a number');
  }

  if (!data.amount || typeof data.amount !== 'number' || data.amount <= 0) {
    errors.push('Amount is required and must be a positive number');
  }

  if (!data.currency || typeof data.currency !== 'string') {
    errors.push('Currency is required and must be a string');
  }

  if (!data.paymentProviderId || typeof data.paymentProviderId !== 'string') {
    errors.push('Payment provider ID is required');
  }

  if (!data.investorId || typeof data.investorId !== 'number') {
    errors.push('Investor ID is required and must be a number');
  }

  if (!data.timestamp || typeof data.timestamp !== 'number') {
    errors.push('Timestamp is required and must be a number');
  }

  if (!data.nonce || typeof data.nonce !== 'string') {
    errors.push('Nonce is required and must be a string');
  }

  if (!data.signature || typeof data.signature !== 'string') {
    errors.push('Signature is required and must be a string');
  }

  if (!data.encryptedData || typeof data.encryptedData !== 'string') {
    errors.push('Encrypted data is required and must be a string');
  }

  // Business logic validation
  if (data.amount && data.amount > 10000000000) { // 10 billion VND
    errors.push('Amount exceeds maximum limit');
  }

  if (data.amount && data.amount < 1000) { // 1,000 VND
    errors.push('Amount is below minimum limit');
  }

  // Timestamp validation (within 5 minutes)
  if (data.timestamp) {
    const now = Date.now();
    const timeDiff = Math.abs(now - data.timestamp);
    if (timeDiff > 5 * 60 * 1000) { // 5 minutes
      errors.push('Request timestamp is too old or too far in the future');
    }
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

// Validate webhook signatures from different payment providers
export function validateWebhookSignature(data: any, signature: string | undefined, provider: string): boolean {
  if (!signature) return false;

  try {
    switch (provider) {
      case 'vnpay':
        return validateVNPaySignature(data, signature);
      case 'momo':
        return validateMoMoSignature(data, signature);
      case 'zalopay':
        return validateZaloPaySignature(data, signature);
      case 'stripe':
        return validateStripeSignature(data, signature);
      default:
        return false;
    }
  } catch (error) {
    console.error(`Webhook signature validation failed for ${provider}:`, error);
    return false;
  }
}

// VNPay signature validation
function validateVNPaySignature(data: any, signature: string): boolean {
  const secretKey = process.env.VNPAY_WEBHOOK_SECRET || '';
  
  // Create signature string from data
  const sortedKeys = Object.keys(data).filter(key => key !== 'vnp_SecureHash').sort();
  const signatureString = sortedKeys.map(key => `${key}=${data[key]}`).join('&');
  
  const expectedSignature = crypto
    .createHmac('sha512', secretKey)
    .update(signatureString, 'utf-8')
    .digest('hex');
  
  return crypto.timingSafeEqual(
    Buffer.from(signature, 'hex'),
    Buffer.from(expectedSignature, 'hex')
  );
}

// MoMo signature validation
function validateMoMoSignature(data: any, signature: string): boolean {
  const secretKey = process.env.MOMO_WEBHOOK_SECRET || '';
  
  const rawSignature = `accessKey=${data.accessKey}&amount=${data.amount}&extraData=${data.extraData}&message=${data.message}&orderId=${data.orderId}&orderInfo=${data.orderInfo}&orderType=${data.orderType}&partnerCode=${data.partnerCode}&payType=${data.payType}&requestId=${data.requestId}&responseTime=${data.responseTime}&resultCode=${data.resultCode}&transId=${data.transId}`;
  
  const expectedSignature = crypto
    .createHmac('sha256', secretKey)
    .update(rawSignature)
    .digest('hex');
  
  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(expectedSignature)
  );
}

// ZaloPay signature validation
function validateZaloPaySignature(data: any, signature: string): boolean {
  const secretKey = process.env.ZALOPAY_WEBHOOK_SECRET || '';
  
  const dataStr = `${data.app_id}|${data.app_trans_id}|${data.app_user}|${data.amount}|${data.app_time}|${data.embed_data}|${data.item}`;
  
  const expectedSignature = crypto
    .createHmac('sha256', secretKey)
    .update(dataStr)
    .digest('hex');
  
  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(expectedSignature)
  );
}

// Stripe signature validation
function validateStripeSignature(data: any, signature: string): boolean {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || '';
  
  try {
    const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
    stripe.webhooks.constructEvent(JSON.stringify(data), signature, webhookSecret);
    return true;
  } catch (error) {
    return false;
  }
}

// Additional security validations
export function validateRequestSecurity(req: any): PaymentValidationResult {
  const errors: string[] = [];

  // Check for common security headers
  if (!req.get('User-Agent')) {
    errors.push('User-Agent header is required');
  }

  // Check for suspicious user agents
  const userAgent = req.get('User-Agent') || '';
  const suspiciousPatterns = [
    /bot/i,
    /crawler/i,
    /spider/i,
    /scraper/i
  ];

  if (suspiciousPatterns.some(pattern => pattern.test(userAgent))) {
    errors.push('Suspicious User-Agent detected');
  }

  // Check request rate
  const clientIP = req.ip;
  if (!clientIP || clientIP === '127.0.0.1') {
    // Allow localhost for development
    if (process.env.NODE_ENV === 'production') {
      errors.push('Invalid client IP address');
    }
  }

  // Check content type for POST requests
  if (req.method === 'POST' && !req.is('application/json')) {
    errors.push('Content-Type must be application/json');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

// Sanitize input data
export function sanitizePaymentData(data: any): any {
  const sanitized = { ...data };

  // Remove potentially dangerous fields
  delete sanitized.__proto__;
  delete sanitized.constructor;
  delete sanitized.prototype;

  // Sanitize string fields
  Object.keys(sanitized).forEach(key => {
    if (typeof sanitized[key] === 'string') {
      // Remove potential script tags and dangerous characters
      sanitized[key] = sanitized[key]
        .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
        .replace(/[<>'"]/g, '')
        .trim();
    }
  });

  return sanitized;
}

// Validate amount limits based on provider
export function validateProviderLimits(amount: number, providerId: string): PaymentValidationResult {
  const errors: string[] = [];

  const providerLimits: Record<string, { min: number; max: number; daily: number }> = {
    vnpay: { min: 10000, max: 500000000, daily: 2000000000 },
    momo: { min: 5000, max: 100000000, daily: 500000000 },
    zalopay: { min: 5000, max: 50000000, daily: 200000000 },
    vietqr: { min: 1000, max: 1000000000, daily: 10000000000 },
    visa_mastercard: { min: 10000, max: 200000000, daily: 1000000000 },
    bank_transfer: { min: 50000, max: 10000000000, daily: 20000000000 }
  };

  const limits = providerLimits[providerId];
  if (!limits) {
    errors.push(`Unknown payment provider: ${providerId}`);
    return { isValid: false, errors };
  }

  if (amount < limits.min) {
    errors.push(`Amount ${amount} is below minimum limit ${limits.min} for ${providerId}`);
  }

  if (amount > limits.max) {
    errors.push(`Amount ${amount} exceeds maximum limit ${limits.max} for ${providerId}`);
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}