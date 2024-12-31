const { BasketProduct } = require('../../db');
const errorApi = require('../../error/errorApi');

const findCartProduct = async (req, res, next) => {
    try {
        const { productId } = req.params;
        const basketId = req.basket.id;

        const basketProduct = await BasketProduct.findOne({ where: { basketId, productId } });

        if (!basketProduct) {
            return next(errorApi.notFoundRequest('Product not found in basket'));
        }

        req.basketProduct = basketProduct;
        next();
    } catch (error) {
        next(errorApi.internalServerError(error.message));
    }
};

module.exports = findCartProduct;