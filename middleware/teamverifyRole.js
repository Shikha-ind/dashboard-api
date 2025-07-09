// const jwt = require('jsonwebtoken');
// const secret = 'your_jwt_secret_key'; // should match exactly with login

// module.exports = function verifyToken(req, res, next) {
//   const authHeader = req.headers['authorization'];

//   if (!authHeader || !authHeader.startsWith('Bearer ')) {
//     return res.status(401).json({ message: 'Authorization token missing or malformed' });
//   }

//   const token = authHeader.split(' ')[1];

//   try {
//     const decoded = jwt.verify(token, secret);
//     req.user = decoded; // this will have emailId, role etc.
//     next();
//   } catch (err) {
//     console.error('JWT Verification failed:', err.message);
//     return res.status(403).json({ message: 'Invalid or expired token' });
//   }
// };
