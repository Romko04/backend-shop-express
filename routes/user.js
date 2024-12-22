const Router = require("express");
const userController = require("../controllers/userController");

const {userRegistrationValidationRules, UserExistsValidationRules} = require("../validators/userValidator");
const validateMiddleware = require("../middleware/validate");

const checkUserExists = require("../middleware/auth/checkUserExists");


const router = new Router()


router.post('', userRegistrationValidationRules, validateMiddleware, userController.create)
router.post('/login', UserExistsValidationRules, validateMiddleware, checkUserExists, userController.login)





module.exports = router

