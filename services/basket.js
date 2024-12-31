const { BasketProduct, Product} = require('../db');
const errorApi = require('../error/errorApi');

class BasketService {
    static async getProducts(basketId) {
        try {
            const basketProducts = await BasketProduct.findAll({
                where: { basketId },
                attributes: { exclude: ['createdAt', 'updatedAt'] },
                include: {
                    model: Product,
                    attributes: { exclude: ['createdAt', 'updatedAt'] }
                }
            });
            
            return basketProducts;

        } catch (error) {
            throw errorApi.internalServerError(error.message);
        }
    }
}

module.exports = BasketService;