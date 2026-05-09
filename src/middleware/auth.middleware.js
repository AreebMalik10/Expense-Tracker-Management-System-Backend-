import jwt from 'jsonwebtoken';
import logger from '../config/logger.js';

export const authenticate = (req, res, next) => {
    try {
        let token;

        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
            token = req.headers.authorization.split(' ')[1];
        } else if (req.cookies.token) {
            token = req.cookies.token;
        }

        if (!token) {
            return res.status(401).json({ success: false, message: 'Unauthorized' });
        }
        
        //verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;

        next();
    } catch (err) {
        logger.error('Error in authentication', err);
        let message = 'Unauthorized';

        if (err.name === 'TokenExpiredError') {
            message = 'Session expired. Please login again.';
        } else if (err.name === 'JsonWebTokenError') {
            message = 'Invalid token';
        }

        return res.status(401).json({ success: false, message: message });
    }
};

export default authenticate;