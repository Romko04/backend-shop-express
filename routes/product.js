const Router = require("express");
const productController = require("../controllers/productController");


const router = new Router()


router.post('/', productController.create)

router.get('', productController.getAll)

router.get('/:id', productController.findProduct)

router.put('/:id', productController.updateProduct)

router.delete('/:id', productController.deleteProduct)



module.exports = router

