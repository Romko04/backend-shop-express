const Router = require("express");
const productController = require("../controllers/productController");
const productValidationRules = require('../validators/productValidator')
const productMiddleware = require('../middleware/productMiddleware')
const validateImages = require('../middleware/imageMiddleware')


const router = new Router()


router.post('/', productValidationRules, productMiddleware, validateImages, productController.create)

router.get('', productController.getAll)

router.get('/:id', productController.findProduct)

router.put('/:id', productValidationRules, productMiddleware, validateImages, productController.updateProduct)

router.delete('/:id', productController.deleteProduct)



module.exports = router

