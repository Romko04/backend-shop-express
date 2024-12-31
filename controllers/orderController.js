const BasketService = require('../services/basket');
const errorApi = require('../error/errorApi');
const orderService = require('../services/order');
const EmailService = require('../services/emailService');
class orderController {
    async create(req, res, next) {
        try {
            
            const { name, phone, address } = req.body;

            const userId  = req.user.id;
            const userEmail = req.user.email;
            const basketId = req.basket.id;


            const basketProducts = await BasketService.getProducts(basketId, next);

            
            if (basketProducts.length === 0) {
               return next(errorApi.badRequest('Basket is empty'));
            }

            const order = await orderService.createOrder({ name, phone, userEmail, address, basketProducts, userId, basketId });

            await EmailService.sendOrderConfirmation(userEmail, order);

            res.json({ success: true, order });

        } catch (e) {
            return next(errorApi.internalServerError(e.message));
        }
    }
}

module.exports = new orderController();