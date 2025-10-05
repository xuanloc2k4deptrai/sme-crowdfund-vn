import { Request, Response, NextFunction } from 'express';

interface RateLimitOptions {
  windowMs: number; // Time window in milliseconds
  max: number; // Maximum number of requests per window
  message?: string; // Custom error message
  standardHeaders?: boolean; // Return rate limit info in headers
  legacyHeaders?: boolean; // Return rate limit info in legacy headers
}

interface ClientInfo {
  count: number;
  resetTime: number;
}

// In-memory store for rate limiting (in production, use Redis)
const clients = new Map<string, ClientInfo>();

// Clean up expired entries every 5 minutes
setInterval(() => {
  const now = Date.now();
  for (const [key, info] of clients.entries()) {
    if (now > info.resetTime) {
      clients.delete(key);
    }
  }
}, 5 * 60 * 1000);

export function rateLimitMiddleware(options: RateLimitOptions) {
  const {
    windowMs,
    max,
    message = 'Too many requests, please try again later.',
    standardHeaders = true,
    legacyHeaders = false
  } = options;

  return (req: Request, res: Response, next: NextFunction) => {
    const key = req.ip || 'unknown';
    const now = Date.now();
    const resetTime = now + windowMs;

    let clientInfo = clients.get(key);

    if (!clientInfo || now > clientInfo.resetTime) {
      // Create new or reset expired entry
      clientInfo = {
        count: 1,
        resetTime
      };
      clients.set(key, clientInfo);
    } else {
      // Increment existing entry
      clientInfo.count++;
    }

    const remaining = Math.max(0, max - clientInfo.count);
    const timeUntilReset = Math.max(0, Math.ceil((clientInfo.resetTime - now) / 1000));

    // Set standard headers
    if (standardHeaders) {
      res.set({
        'RateLimit-Limit': max.toString(),
        'RateLimit-Remaining': remaining.toString(),
        'RateLimit-Reset': new Date(clientInfo.resetTime).toISOString()
      });
    }

    // Set legacy headers
    if (legacyHeaders) {
      res.set({
        'X-RateLimit-Limit': max.toString(),
        'X-RateLimit-Remaining': remaining.toString(),
        'X-RateLimit-Reset': Math.ceil(clientInfo.resetTime / 1000).toString()
      });
    }

    if (clientInfo.count > max) {
      res.status(429).json({
        error: 'Too Many Requests',
        message,
        retryAfter: timeUntilReset
      });
      return;
    }

    next();
  };
}

// Specific rate limiters for different endpoints
export const paymentRateLimit = rateLimitMiddleware({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 50, // 50 payment requests per 15 minutes per IP
  message: 'Too many payment requests. Please try again in 15 minutes.'
});

export const verificationRateLimit = rateLimitMiddleware({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 10, // 10 verification attempts per 5 minutes per IP
  message: 'Too many verification attempts. Please try again in 5 minutes.'
});

export const webhookRateLimit = rateLimitMiddleware({
  windowMs: 60 * 1000, // 1 minute
  max: 100, // 100 webhook requests per minute per IP
  message: 'Webhook rate limit exceeded.'
});

export const analyticsRateLimit = rateLimitMiddleware({
  windowMs: 60 * 1000, // 1 minute
  max: 30, // 30 analytics requests per minute per IP
  message: 'Analytics rate limit exceeded. Please try again later.'
});

// Enhanced rate limiting with user-based limits
export function createUserBasedRateLimit(options: RateLimitOptions & { 
  getUserId?: (req: Request) => string | number;
  skipSuccessfulRequests?: boolean;
  skipFailedRequests?: boolean;
}) {
  const {
    windowMs,
    max,
    message = 'Too many requests, please try again later.',
    getUserId,
    skipSuccessfulRequests = false,
    skipFailedRequests = false
  } = options;

  const userClients = new Map<string, ClientInfo>();

  return (req: Request, res: Response, next: NextFunction) => {
    const key = getUserId ? getUserId(req).toString() : req.ip || 'unknown';
    const now = Date.now();
    const resetTime = now + windowMs;

    let clientInfo = userClients.get(key);

    if (!clientInfo || now > clientInfo.resetTime) {
      clientInfo = {
        count: 0,
        resetTime
      };
      userClients.set(key, clientInfo);
    }

    // Increment before processing unless we skip on certain conditions
    if (!skipSuccessfulRequests && !skipFailedRequests) {
      clientInfo.count++;
    }

    const remaining = Math.max(0, max - clientInfo.count);

    if (clientInfo.count > max) {
      res.status(429).json({
        error: 'Too Many Requests',
        message,
        retryAfter: Math.ceil((clientInfo.resetTime - now) / 1000)
      });
      return;
    }

    // If we're skipping based on response status, handle it after response
    if (skipSuccessfulRequests || skipFailedRequests) {
      const originalSend = res.send;
      res.send = function(body) {
        const statusCode = res.statusCode;
        const shouldSkip = 
          (skipSuccessfulRequests && statusCode >= 200 && statusCode < 300) ||
          (skipFailedRequests && statusCode >= 400);

        if (!shouldSkip) {
          clientInfo!.count++;
        }

        return originalSend.call(this, body);
      };
    }

    next();
  };
}

// Distributed rate limiting using Redis (for production)
export class RedisRateLimit {
  private redisClient: any;

  constructor(redisClient: any) {
    this.redisClient = redisClient;
  }

  createLimiter(options: RateLimitOptions) {
    const { windowMs, max, message = 'Too many requests' } = options;

    return async (req: Request, res: Response, next: NextFunction) => {
      const key = `rate_limit:${req.ip}`;
      const now = Date.now();
      const window = Math.floor(now / windowMs);
      const redisKey = `${key}:${window}`;

      try {
        const current = await this.redisClient.incr(redisKey);
        
        if (current === 1) {
          await this.redisClient.expire(redisKey, Math.ceil(windowMs / 1000));
        }

        const remaining = Math.max(0, max - current);
        const resetTime = (window + 1) * windowMs;

        res.set({
          'X-RateLimit-Limit': max.toString(),
          'X-RateLimit-Remaining': remaining.toString(),
          'X-RateLimit-Reset': new Date(resetTime).toISOString()
        });

        if (current > max) {
          res.status(429).json({
            error: 'Too Many Requests',
            message,
            retryAfter: Math.ceil((resetTime - now) / 1000)
          });
          return;
        }

        next();
      } catch (error) {
        console.error('Rate limiting error:', error);
        // If Redis fails, allow the request to proceed
        next();
      }
    };
  }
}