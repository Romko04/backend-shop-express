const Router = require("express");
const cartController = require("../controllers/cartController");
const validate = require("../middleware/validate");
const productCartValidationRules = require("../validators/cartProductValidator");
// const {userRegistrationValidationRules, UserExistsValidationRules} = require("../validators/userValidator");
// const validateMiddleware = require("../middleware/validate");

// const checkUserExists = require("../middleware/auth/checkUserExists");

const router = new Router()


router.post('/add', productCartValidationRules, validate, cartController.add)
router.post('/remove', cartController.remove)
router.post('/edit', cartController.edit)
router.get('/get', cartController.get)
router.post('/clear', cartController.clear)


module.exports = router

