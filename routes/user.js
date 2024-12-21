const Router = require("express");
const userController = require("../controllers/userController");
const userRegistrationValidationRules = require("../validators/userValidator");

const validateMiddleware = require("../middleware/validate");


const router = new Router()


router.post('',userRegistrationValidationRules, validateMiddleware, userController.create)




module.exports = router

