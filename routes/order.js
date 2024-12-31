const Router = require("express");
const orderController = require("../controllers/orderController");
const validate = require("../middleware/validate");
const createOrderValidationRules = require("../validators/createOrderValidatior");

const router = new Router()

router.post('/create', createOrderValidationRules, validate, orderController.create)



module.exports = router

