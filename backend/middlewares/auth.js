const jwt = require('jsonwebtoken');
require('dotenv').config();

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

// Verify logged-in user
const verifyToken = (req, res, next) => {
    console.log('cookies:', req.cookies)       // ✅ Add this
    console.log('req.user before:', req.user)
    // Read cookie
    const token = req.cookies.token;

    // Token exists?
    if (!token) {
        return res.status(401).json({
            success: false,
            message: 'No token provided'
        });
    }

    // Verify JWT
    jwt.verify(token, JWT_SECRET_KEY, (err, decoded) => {

        // Invalid or expired token
        if (err) {

            // Expired token
            if (err.name === 'TokenExpiredError') {
                return res.status(401).json({
                    success: false,
                    message: 'Token expired!'
                });
            }

            return res.status(401).json({
                success: false,
                message: 'Invalid token'
            });
        }

        // Save decoded payload
        req.user = decoded;

        // Continue
        next();
    });
};

// Verify admin role
const verifyAdmin = (req, res, next) => {

    // Check admin role
    if (req.user.role !== 'admin') {
        return res.status(403).json({
            success: false,
            message: 'Access denied'
        });
    
    }
    next();
};

module.exports = {
    verifyToken,
    verifyAdmin
}