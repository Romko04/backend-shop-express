const Router = require("express");
const router = new Router()
const brandRouter = require('./brand')
const productRouter = require('./product')
const userRouter = require('./user')



router.use('/brands', brandRouter) // розділяю маршрути на їх логічні частини
router.use('/product', productRouter) 
router.use('/user', userRouter) 



module.exports = router

