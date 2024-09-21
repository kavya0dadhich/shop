const jwt = require('jsonwebtoken'); // Ensure you require jwt if not already

const authMiddleware = (req, res, next) => {
    const token = req.cookies.token; // Refer to your cookie by its name
    console.log("Token from cookie:", token); // Debugging line
    if (!token) {
        return res.status(401).json({ message: 'Access denied, no token provided' });
    }

    try {
        const SECRET_KEY = "s34d5f6yuytr3456yg53456@#$%&*6";
        const decoded = jwt.verify(token, SECRET_KEY);
        req.User = decoded; // Attach the user data to the request
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid or expired token' });
    }
};

module.exports = authMiddleware;
