const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    try {
        // Get token from header
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({ error: 'Token não fornecido' });
        }

        // Extract token (format: "Bearer <token>")
        const parts = authHeader.split(' ');

        if (parts.length !== 2 || parts[0] !== 'Bearer') {
            return res.status(401).json({ error: 'Formato de token inválido' });
        }

        const token = parts[1];

        // Verify token
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET || 'your-secret-key-change-in-production'
        );

        // Attach user info to request
        req.user = decoded;

        return next();
    } catch (error) {
        return res.status(401).json({ error: 'Token inválido ou expirado' });
    }
};

module.exports = authMiddleware;
