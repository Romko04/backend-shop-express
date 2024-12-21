const Router = require("express");
const userController = require("../controllers/userController");

const {userRegistrationValidationRules, UserExistsValidationRules} = require("../validators/userValidator");
const validateMiddleware = require("../middleware/validate");

const checkUserExists = require("../middleware/auth/checkUserExists");


const router = new Router()


router.post('', userRegistrationValidationRules, validateMiddleware, userController.create)
router.post('/auth', UserExistsValidationRules, validateMiddleware, checkUserExists, userController.auth)





module.exports = router

