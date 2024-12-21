const Router = require("express");
const productController = require("../controllers/productController");
const productValidationRules = require('../validators/productValidator')
const validateMiddleware = require('../middleware/validate')
const validateImages = require('../middleware/product/image')


const router = new Router()


router.post('/', productValidationRules, validateMiddleware, validateImages, productController.create)

router.get('', productController.getAll)

router.get('/:id', productController.findProduct)

router.put('/:id', productValidationRules, validateMiddleware, validateImages, productController.updateProduct)

router.delete('/:id', productController.deleteProduct)



module.exports = router

