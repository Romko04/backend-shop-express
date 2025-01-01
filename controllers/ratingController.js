const errorApi = require('../error/errorApi');
const productService = require('../services/product');

class ratingController {
    async create(req, res, next) {
        try {
            const { userId, productId, ratingId } = req.body;

            
            await productService.createProductRating({ userId, productId, ratingId });

            return res.json({ success: true});
            
           

        } catch (e) {
            return next(errorApi.internalServerError(e.message));
        }
    }
}

module.exports = new ratingController();