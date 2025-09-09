import dotenv from 'dotenv';

dotenv.config();

const config = {
  port: process.env.PORT || 5000, // Updated to match frontend API URL
  db: {
    url: process.env.DATABASE_URL || 'mongodb://localhost:27017/sme-crowdfund',
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'your_jwt_secret_dev_only',
    expiresIn: process.env.JWT_EXPIRES_IN || '24h', // Longer for development
  },
  payment: {
    provider: process.env.PAYMENT_PROVIDER || 'stripe',
    apiKey: process.env.PAYMENT_API_KEY || 'your_payment_api_key',
  },
  notification: {
    service: process.env.NOTIFICATION_SERVICE || 'email',
    apiKey: process.env.NOTIFICATION_API_KEY || 'your_notification_api_key',
  },
};

export default config;