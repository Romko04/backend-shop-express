const Router = require("express");
const brandController = require("../controllers/brandController");


const router = new Router()


router.post('/', brandController.create)

router.get('/', brandController.getAll)

router.get('/:id', brandController.findBrand)

router.put('/:id', brandController.updateBrand)

router.delete('/:id', brandController.DeleteBrand)



module.exports = router

