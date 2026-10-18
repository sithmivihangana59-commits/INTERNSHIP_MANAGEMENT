import jwt from 'jsonwebtoken';
import User from '../models/User.js';

/**
 * @desc    Middleware to protect routes, ensures user is logged in
 * @route   Any protected route
 */
export const protect = async (req, res, next) => {
  let token;

  // Check if authorization header exists and starts with Bearer
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Extract token from Bearer <token>
      token = req.headers.authorization.split(' ')[1];

      // Verify token using JWT_SECRET
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Find user by ID and attach to req.user (excluding password)
      req.user = await User.findById(decoded.id).select('-password');

      if (!req.user) {
        return res.status(401).json({ success: false, error: 'Not authorized, user not found' });
      }

      if (req.user.status === 'inactive') {
        return res.status(401).json({ success: false, error: 'This account is inactive' });
      }

      next();
    } catch (error) {
      console.error(error);
      return res.status(401).json({ success: false, error: 'Not authorized, token failed' });
    }
  }

  // If no token was found in the header
  if (!token) {
    return res.status(401).json({ success: false, error: 'Not authorized, no token' });
  }
};

/**
 * @desc    Middleware to restrict access based on user roles
 * @param   {...String} roles - Array of allowed roles
 * @returns {Function} Middleware function
 */
export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        error: `User role '${req.user ? req.user.role : 'unknown'}' is not authorized to access this route`,
      });
    }
    next();
  };
};
