const tokenService = require('../../services/token');
const errorApi = require('../../error/errorApi');

const checkAuth = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return next(errorApi.unauthorized('Authorization header is missing'));
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
        return next(errorApi.unauthorized('Token is missing'));
    }

    const userData = tokenService.verifyToken(token);
    if (!userData) {
        return next(errorApi.unauthorized('Invalid token'));
    }

    req.user = userData;
    next();
};

module.exports = checkAuth;