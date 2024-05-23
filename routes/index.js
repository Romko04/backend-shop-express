const Router = require("express");
const router = new Router()
const brandRouter = require('./brand')
const productRouter = require('./product')


router.use('/brands', brandRouter) // розділяю маршрути на їх логічні частини
router.use('/product', productRouter) 


module.exports = router

