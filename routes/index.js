const Router = require("express");
const router = new Router()
const categoryRouter = require('./category')
const productRouter = require('./product')
const userRouter = require('./user')
const cartRouter = require('./cart')
const orderRouter = require('./order')
const ratingRouter = require('./rating')

const checkAuth = require('../middleware/auth/checkAuth')
const checkUserExists = require('../middleware/auth/checkUserExists')
const findBasket = require('../middleware/cart/findBasket');




router.use('/category', categoryRouter) // розділяю маршрути на їх логічні частини
router.use('/product', productRouter) 
router.use('/user', userRouter) 
router.use('/cart', checkAuth, checkUserExists, findBasket, cartRouter);
router.use('/order', checkAuth, checkUserExists, findBasket, orderRouter);
router.use('/rating', checkAuth, checkUserExists, ratingRouter);





module.exports = router

