const { Order, OrderProduct, Product, PaymentMethod,  DeliveryMethod, BasketProduct} = require('../db');
const errorApi = require('../error/errorApi');
require('dotenv').config()

const EmailService = require('./emailService');

class orderService {
    static async createOrder(orderData) {
        try {
            const { name, phone, address, basketProducts, userId, userEmail, basketId } = orderData;

            const totalPrice = basketProducts.reduce((acc, product) => acc + product.product.price * product.count, 0);

            const order = await Order.create({
                userId: userId,
                name,
                phone,
                address,
                totalPrice,
                paymentMethodId: 1,
                deliveryMethodId: 1
            });

            for (const item of basketProducts) {
                const { count, product: { id, price } } = item;
                const itemTotalPrice = count * price;

                await OrderProduct.create({
                    orderId: order.id,
                    productId: id,
                    quantity: count,
                    price: price,
                    totalPrice: itemTotalPrice
                });

                // // Оновлення кількості товарів на складі
                // await Product.update(
                //     { stock: sequelize.literal(`stock - ${count}`) },
                //     { where: { id: id } }
                // );
            }

            // Видалення товарів з корзини
            await BasketProduct.destroy({ where: { basketId: basketId } });

            return this.getOrderDetails(order.id);

        } catch (error) {
            throw errorApi.internalServerError(error.message);
        }
    }

    static async getOrderDetails(orderId) {
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

module.exports = orderService;