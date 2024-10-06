const jwt = require('jsonwebtoken');

// Middleware to authenticate JWT token
const authenticateToken = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]; // Get token from the Authorization header
    // console.log('hello1');
    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }
    // console.log(token);
    // console.log(process.env.JWT_SECRET)
    // console.log('hello2');
    try {
        // Verify token
        // console.log('decoded: ');
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret_key');
        // console.log('hello3');
        req.user = decoded; // Attach the decoded user info (e.g., user ID) to req.user
        next();
    } catch (error) {
        return res.status(401).json({ msg: 'Token is not valid' });
    }
};

module.exports = authenticateToken;