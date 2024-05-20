const Router = require("express");
const router = new Router()
const brandRouter = require('./brand')

router.use('/brands', brandRouter) // розділяю маршрути на їх логічні частини

module.exports = router

