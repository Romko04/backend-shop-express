const Router = require("express");
const categoryController = require("../controllers/categoryController");

const categoryValidationRules = require('../validators/categoryValidatior')
const validate = require("../middleware/validate");



const router = new Router()


router.post('/create', categoryValidationRules, validate,  categoryController.create)

router.get('/', categoryController.getAll)

router.get('/:id', categoryController.findCategory)

router.put('/:id', categoryController.updateCategory)

router.delete('/:id', categoryController.DeleteCategory)



module.exports = router

