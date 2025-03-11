"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const firebaseConfig_1 = require("../config/firebaseConfig");
const authMiddleware = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            res.status(401).json({ error: 'Unauthorized - Missing or invalid token format' });
            return;
        }
        const token = authHeader.split('Bearer ')[1];
        if (!token) {
            res.status(401).json({ error: 'Unauthorized - No token provided' });
            return;
        }
        // Verifikasi token Firebase
        const decodedToken = await firebaseConfig_1.auth.verifyIdToken(token);
        if (!decodedToken) {
            res.status(401).json({ error: 'Unauthorized - Invalid token' });
            return;
        }
        req.user = {
            uid: decodedToken.uid,
            email: decodedToken.email || '',
        };
        next();
    }
    catch (error) {
        console.error('Auth Middleware Error:', error);
        res.status(401).json({ error: 'Unauthorized - Invalid token' });
    }
};
exports.authMiddleware = authMiddleware;
