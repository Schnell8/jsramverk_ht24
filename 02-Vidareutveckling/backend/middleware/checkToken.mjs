import jwt from 'jsonwebtoken';
import 'dotenv/config';

const checkToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Ta bort "Bearer " från token

    if (!token) {
        return res.status(401).json({
            message: 'No token provided',
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Lägg till den dekrypterade payloaden i request
        next();
    } catch (error) {
        console.error('Error verifying token:', error);
        return res.status(401).json({
            message: 'Invalid or expired token',
        });
    }
};

export default checkToken;
