const jwt = require('jsonwebtoken');

const ensureAuthenticated = (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(403).json({ message: 'Unauthorized, JWT Token is required' });
        }

        const token = authHeader.split(' ')[1]; // Extract token safely
        if (!token) {
            return res.status(403).json({ message: 'Unauthorized, Token missing' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach user info to request
        next();
    } catch (err) {
        return res.status(403).json({
            message: 'Unauthorized, JWT Token is wrong or expired',
            error: err.message
        });
    }
};

module.exports = ensureAuthenticated;
