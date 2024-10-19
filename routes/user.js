const Router = require("express");
const userController = require("../controllers/userController");


const router = new Router()


router.post('/', userController.create)




module.exports = router

