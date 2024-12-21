const { User } = require('../db')
const bcrypt = require('bcrypt');
const errorApi = require('../error/errorApi')


class UserController {
    async create(req, res, next) {
        try {
            const { password, email, firstName, lastName } = req.body
            const hashPassword = await bcrypt.hash(password, 4)
            const newUser = await User.create({ password: hashPassword, email, firstName, lastName})
            res.json({succes:true})
        } catch (error) {
             next(errorApi.badRequest(error.message))
        }

    }
}

module.exports = new UserController()