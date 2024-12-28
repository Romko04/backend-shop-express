const Router = require("express");
const cartController = require("../controllers/cartController");
const validate = require("../middleware/validate");
const findBasketProduct = require("../middleware/cart/findBasketProduct");
const productCartValidationRules = require("../validators/cartProductValidator");


const router = new Router()


router.post('/add/:productId', productCartValidationRules, validate, cartController.add)
router.delete('/remove/:productId', findBasketProduct, cartController.remove)
router.put('/edit/:productId', findBasketProduct, productCartValidationRules, validate, cartController.edit)
router.get('/get', cartController.get)
router.delete('/clear', cartController.clear)


module.exports = router

