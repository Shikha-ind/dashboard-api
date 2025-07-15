const rateLimit = require('express-rate-limit');





// Limit: 5 login attempts per 15 minutes
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 requests per window
  message: 'Too many login attempts from this IP, please try again after 15 minutes.',
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res, next, options) => {
    console.warn(`🚨 Rate limit exceeded for IP: ${req.ip} on ${req.originalUrl}`);
    
    res.status(options.statusCode).json({
      success: false,
      message: 'Too many requests, please slow down.',
      retryAfter: Math.ceil(options.windowMs / 60000) + ' minutes'
    });
  }
});

const forgotPasswordLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 3, // Limit to 3 requests per hour
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res, next, options) => {
    console.warn(`⚠️ Forgot Password rate limit hit. IP: ${req.ip}, Path: ${req.originalUrl}`);

    return res.status(options.statusCode).json({
      success: false,
      message: 'Too many password reset requests. Please try again after one hour.',
      retryAfterMinutes: Math.ceil(options.windowMs / 60000),
    });
  }
});

module.exports = { loginLimiter, forgotPasswordLimiter };
