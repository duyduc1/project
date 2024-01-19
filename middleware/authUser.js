const jwt = require('jsonwebtoken');

const verifyToken = (token) => {
    try {
        const decoded = jwt.verify(token, 'your-secret-key');
        return decoded;
    } catch (error) {
        console.error('Token verification failed:', error.message);
        return null;
    }
};
exports.checkUser = async (req, res, next) => {
    const token = req.cookies.userToken;
    if (!token) {
       return res.redirect('/login');
    }
    const decoded = verifyToken(token);
    if (decoded) {
        req.user = decoded
        next()
    }else {
       return res.redirect('/login')
    }
};
