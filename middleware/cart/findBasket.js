const { Basket } = require('../../db');
const errorApi = require('../../error/errorApi');

const findBasket = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const basket = await Basket.findOne({ where: { userId } });

        if (!basket) {
            return next(errorApi.notFoundRequest('Basket not found'));
        }

        req.basket = basket;
        next();
    } catch (error) {
        next(errorApi.internalServerError(error.message));
    }
};

module.exports = findBasket;