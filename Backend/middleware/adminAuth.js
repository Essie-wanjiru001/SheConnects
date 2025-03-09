const jwt = require('jsonwebtoken');

const adminAuth = async (req, res, next) => {
    try {
        const authHeader = req.header('Authorization');
        console.log('Auth Header received:', authHeader);

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ 
                success: false, 
                error: 'No token provided or invalid format' 
            });
        }

        const token = authHeader.replace('Bearer ', '');
        console.log('Token extracted:', token);
        console.log('JWT_SECRET:', process.env.JWT_SECRET); // Make sure to remove in production

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            console.log('Decoded token:', decoded);
            
            if (!decoded.is_admin) {
                return res.status(403).json({ 
                    success: false, 
                    error: 'Access denied: Admin privileges required' 
                });
            }

            req.user = decoded;
            next();
        } catch (jwtError) {
            console.error('JWT Verification Error:', jwtError);
            return res.status(401).json({ 
                success: false, 
                error: `Invalid or expired token: ${jwtError.message}` 
            });
        }
    } catch (error) {
        console.error('Auth Middleware Error:', error);
        res.status(500).json({ 
            success: false, 
            error: 'Authentication failed' 
        });
    }
};

module.exports = adminAuth;