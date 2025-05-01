const jwt = require('jsonwebtoken');
require('dotenv').config();

/**
 * Generate a JWT token for a user
 * @param {Object} user - User data to encode in the token
 * @param {string} expiresIn - Token expiration time (default: "1h")
 * @returns {string} JWT token
 */
const generateToken = (user, expiresIn = "1h") => {
  try {
    const token = jwt.sign(
      { email: user.email, id: user.id },
      process.env.TOKEN_SECRET,
      { expiresIn }
    );
    return token;
  } catch (error) {
    console.error("Error generating JWT token:", error);
    throw new Error("Failed to generate authentication token");
  }
};

/**
 * Verify a JWT token
 * @param {string} token - JWT token to verify
 * @returns {Object} Decoded token payload
 */
const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
    return decoded;
  } catch (error) {
    console.error("Error verifying JWT token:", error);
    throw error;
  }
};

/**
 * Middleware to ensure authentication
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
const ensureAuth = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ 
      success: false, 
      message: "Error! Token was not provided." 
    });
  }
  
  try {
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = decoded; // Add decoded user to request object
    next();
  } catch (err) {
    return res.status(401).json({ 
      success: false, 
      message: "Invalid or expired token" 
    });
  }
};

module.exports = {
  generateToken,
  verifyToken,
  ensureAuth
};
