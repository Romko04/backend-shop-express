const { User } = require('../../db')
const errorApi = require('../../error/errorApi')


const checkUserExists = async (req, res, next) => {
    const email = req.body.email || req.user?.email;

    const user = await User.findOne({where: {email}})


    if (user) {
        return next()
    }

    next(errorApi.badRequest('User not found'))

}

module.exports = checkUserExists