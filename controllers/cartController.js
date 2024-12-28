const { where } = require('sequelize');
const { Basket, BasketProduct, Product } = require('../db');
const errorApi = require('../error/errorApi');

class CartController {
    async add(req, res, next) {
        try {
            const { productId } = req.params;
            const { quantity } = req.body;
            const userId = req.user.id;

            let basket = await Basket.findOne({ where: { userId } });
            if (!basket) {
                basket = await Basket.create({ userId });
            }

            let basketProduct = await BasketProduct.findOne({ where: { basketId: basket.id, productId } });
            if (basketProduct) {
                basketProduct.count += Number(quantity);
                await basketProduct.save();
            } else {
                basketProduct = await BasketProduct.create({ basketId: basket.id, productId, count: quantity });
            }

            res.json({ success: true, basketProduct });

        } catch (error) {
            next(errorApi.internalServerError(error.message));
        }
    }

    async remove(req, res, next) {
        try {

            let basketProduct = req.basketProduct;

            await basketProduct.destroy();
            res.json({ success: true });
            
        } catch (error) {
            next(errorApi.internalServerError(error.message));
        }
    }

    async edit(req, res, next) {
        try {
            const {quantity } = req.body;

            let basketProduct = req.basketProduct;

            basketProduct.count = quantity;
            await basketProduct.save();

            res.json({ success: true, basketProduct });
        } catch (error) {
            next(errorApi.internalServerError(error.message));
        }
    }

    async get(req, res, next) {
        try {
            const userId = req.user.id;

            const basket = await Basket.findOne({
                where: { userId },
                include: {
                    model: BasketProduct,
                    include: {
                        model: Product,
                        attributes: ['name', 'price', 'image']
                    }
                }
            });

            if (!basket) {
                return next(errorApi.notFoundRequest('Basket not found'));
            }

            res.json({ success: true, basket });
        } catch (error) {
            next(errorApi.internalServerError(error.message));
        }
    }

    async clear(req, res, next) {
        try {

            const basket = req.basket;

            await BasketProduct.destroy({ where: { basketId: basket.id } });
            res.json({ success: true });
        } catch (error) {
            next(errorApi.internalServerError(error.message));
        }
    }
}

module.exports = new CartController();