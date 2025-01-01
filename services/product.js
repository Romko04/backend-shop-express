const { UserProductRating } = require('../db');
const errorApi = require('../error/errorApi');

class productService {
    static async createProductRating({userId, productId, ratingId}) {

        
        try {

            const userProductRating = await UserProductRating.findOne({
                where: {
                    userId,
                    productId
                }
            });

            if (userProductRating) {
                throw errorApi.badRequest('You have already rated this product');
            }

            await UserProductRating.create({
                userId,
                productId,
                ratingId
            });

            return true;

        } catch (error) {
            throw errorApi.internalServerError(error.message);
        }
    }

    static async getAverageProductRating(orderId) {
        try {
            const order = await Order.findByPk(orderId, {
                include: [
                    {
                        model: OrderProduct,
                        attributes: { exclude: ['createdAt', 'updatedAt'] },
                        include: {
                            model: Product,
                            attributes: ['id', 'name', 'price', 'image']
                        },
                    },
                    { model: DeliveryMethod, attributes: ['name'] },
                    { model: PaymentMethod, attributes: ['name'] },
                  ],
            });

            if (!order) {
                throw errorApi.notFound('Order not found');
            }

            return order;

        } catch (error) {
            throw errorApi.internalServerError(error.message);
        }
    }
}

module.exports = productService;