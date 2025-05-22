const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    const JWT_SECRET = process.env.JWT_SECRET || 'secret';
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ message: 'Invalid or expired token.' });
  }
};

const isStaff = (req, res, next) => {
  // Check if user exists and has staff role
  if (!req.user || (req.user.role !== 'admin' && req.user.role !== 'petugas')) {
    return res.status(403).json({ message: 'Access denied. Staff privileges required.' });
  }
  next();
};

const isAdmin = (req, res, next) => {
  // Check if user exists and has admin role
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied. Admin privileges required.' });
  }
  next();
};

module.exports = { authenticateToken, isStaff, isAdmin };