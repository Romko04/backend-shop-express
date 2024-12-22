const tokenService = require('../../services/token');
const errorApi = require('../../error/errorApi');

const checkRole = (requiredRole) => {
    return (req, res, next) => {
        
        if (!requiredRole.includes(req.user.roleId)) { 
            return next(errorApi.forbidden('You do not have permission to perform this action'));
        }

        next();
    };
};

module.exports = checkRole;