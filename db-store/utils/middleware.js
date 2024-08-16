export const authMiddleware = (req, res, next) => {
    const token = req.cookies.authToken;
    console.log(req.cookies.authToken);
    if (!token) {
        return res.status(401).json({ message: 'Access denied, no token provided' });
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        req.User = decoded; // Attach the user data to the request
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid or expired token' });
    }
};