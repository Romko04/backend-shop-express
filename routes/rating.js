const Router = require("express");
const ratingController = require("../controllers/ratingController");
const validate = require("../middleware/validate");
const createRatingValidationRules = require("../validators/categoryValidatior");
const checkUserRating = require("../middleware/product/checkUserRating");

const router = new Router()

router.post('/create', createRatingValidationRules, validate, checkUserRating, ratingController.create)



module.exports = router

