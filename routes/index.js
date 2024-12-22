const Router = require("express");
const router = new Router()
const brandRouter = require('./brand')
const productRouter = require('./product')
const userRouter = require('./user')
const cartRouter = require('./cart')

const checkAuth = require('../middleware/auth/checkAuth')
const checkUserExists = require('../middleware/auth/checkUserExists')



router.use('/brands', brandRouter) // розділяю маршрути на їх логічні частини
router.use('/product', productRouter) 
router.use('/user', userRouter) 
router.use('/cart', checkAuth, checkUserExists, cartRouter);




module.exports = router

