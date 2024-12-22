const { User } = require('../db')
const bcrypt = require('bcrypt');
const errorApi = require('../error/errorApi')
const token = require('../services/token')



class UserController {
    async create(req, res, next) {
        try {
            const { password, email, firstName, lastName } = req.body
            const hashPassword = await bcrypt.hash(password, 4)
            await User.create({ password: hashPassword, email, firstName, lastName })
            res.json({ succes: true })
        } catch (error) {
            next(errorApi.badRequest(error.message))
        }

    }

    async login(req, res, next) {

        try {
            const { password, email } = req.body
            const user = await User.findOne({ where: { email } })
            const passwordHash = user.password;
            
            bcrypt.compare(password, passwordHash, function (err, result) {
                if (result) {
                    const payload = {email, id: user.id, roleId: user.roleId}
                    const generatedToken = token.generate(payload)

                    res.json({ succes: true, generatedToken})
                } else {
                    next(errorApi.badRequest('Password or email incorrect'))
                }
            });
            
        } catch (error) {
            next(errorApi.badRequest(error.message))
        }

    }
}

module.exports = new UserController()