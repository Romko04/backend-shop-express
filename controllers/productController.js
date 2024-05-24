const uuid = require('uuid')
const path = require('path');
const { Product, Brand } = require('../db')
const errorApi = require('../error/errorApi')


class ProductController {
    async create(req, res, next) {
        try {
            const { name, price, rating, typeId, brandId } = req.body
            const { img } = req.files
            let fileName = uuid.v4() + ".jpg"
            img.mv(path.resolve(__dirname, '..', 'static', fileName))
            const product = await Product.create({
                name, price, rating, image: fileName, typeId, brandId
            })
            return res.json(product)
        } catch (error) {
            next(errorApi.badRequest(error.message))
        }
    }

    async getAll(req, res, next) {
        try {
            let { brandId, typeId, limit, page } = req.query
            limit = limit || 5
            page = page || 1
            const offset = limit * page - limit

            const where = {}
            if (brandId) where.brandId = brandId
            if (typeId) where.typeId = typeId

            const products = await Product.findAndCountAll({
                attributes: { exclude: ['createdAt', 'updatedAt'] },
                include: [{
                    model: Brand,
                    attributes: ['name']
                }],
                where,
                limit,
                offset,
            })
            
            products
                ? res.status(200).json({ products })
                : next(errorApi.badRequest("Product not found"))
        } catch (error) {
            next(errorApi.badRequest(error.message))
        }
    }

    async findProduct(req, res, next) {
        try {
            const { id } = req.params
            const product = await Product.findOne({
                where: { id },
                attributes: {
                    exclude: ['createdAt', 'updatedAt'],
                },
                include: [{
                    model: Brand,
                    attributes: ['name']
                }]
            })

            product
                ? res.status(200).json({ product })
                : next(errorApi.badRequest("Product not found"))

        } catch (error) {
            next(errorApi.badRequest(error.message))
        }
    }

    async deleteProduct(req, res, next) {
        try {
            const { id } = req.params

            const product = await Product.destroy({ where: { id } })
            product
                ? res.status(200).json({ succes: true })
                : next(errorApi.badRequest("Product not found"))

        } catch (error) {
            next(errorApi.badRequest(error.message))
        }
    }

    async updateProduct(req, res, next) {
        try {
            const { id } = req.params
            const { name, price, rating, image: fileName, typeId, brandId } = req.body
            const product = await Product.update({ name, price, rating, image: fileName, typeId, brandId }, { where: { id } })
            product
                ? res.status(200).json({ succes: true })
                : next(errorApi.badRequest("Product not found"))
        } catch (error) {
            next(errorApi.badRequest(error.message))
        }

    }
}

module.exports = new ProductController()