const jwt = require('jsonwebtoken');
require('dotenv').config(); // Load env variables

const SECRET_KEY = process.env.JWT_SECRET;


function authenticateToken(req, res, next) {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid or expired token.' });
    }

    req.user = user; // Attach user info to request
    next();
  });
}

module.exports = authenticateToken;
