const Router = require("express");
const productController = require("../controllers/productController");
const productValidationRules = require('../validators/productValidator')
const validateMiddleware = require('../middleware/validate')
const сheckRole = require('../middleware/auth/checkRole')
const validateImages = require('../middleware/product/image')
const checkAuth = require('../middleware/auth/checkAuth')


const router = new Router()



router.post('/', checkAuth, сheckRole([2]), productValidationRules, validateMiddleware, validateImages, productController.create)

router.get('', productController.getAll)

router.get('/:id', productController.findProduct)

router.put('/:id', checkAuth, сheckRole([2]), productValidationRules, validateMiddleware, validateImages, productController.updateProduct)

router.delete('/:id', сheckRole([2]), productController.deleteProduct)



module.exports = router

