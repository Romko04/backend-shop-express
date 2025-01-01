const uuid = require('uuid')
const path = require('path');
const { Product, Category } = require('../db')
const errorApi = require('../error/errorApi')


class ProductController {
    async create(req, res, next) {
        try {
            const { name, price, categoryId} = req.body
            const { img } = req.files
            let fileName = uuid.v4() + ".jpg"
            img.mv(path.resolve(__dirname, '..', 'static', fileName))
            const product = await Product.create({
                name, price, image: fileName, categoryId, 
            })
            return res.json(product)
        } catch (error) {
            next(errorApi.badRequest(error.message))
        }
    }

    async getAll(req, res, next) {
        try {
            let { categoryId, limit, page } = req.query
            limit = limit || 5
            page = page || 1
            const offset = limit * page - limit

            const where = {}
            if (categoryId) where.categoryId = categoryId

            const products = await Product.findAndCountAll({
                attributes: { exclude: ['createdAt', 'updatedAt'] },
                include: [{
                    model: Category,
                    attributes: ['name']
                }],
                where,
                limit,
                offset,
            })
            
            products
                ? res.status(200).json({ products })
                : next(errorApi.notFoundRequest("Product not found"))
        } catch (error) {
            next(errorApi.notFoundRequest(error.message))
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
                    model: Category,
                    attributes: ['name']
                }]
            })

            product
                ? res.status(200).json({ product })
                : next(errorApi.notFoundRequest("Product not found"))

        } catch (error) {
            next(errorApi.notFoundRequest(error.message))
        }
    }

    async deleteProduct(req, res, next) {
        try {
            const { id } = req.params

            const product = await Product.destroy({ where: { id } })
            product
                ? res.status(200).json({ succes: true })
                : next(errorApi.notFoundRequest("Product not found"))

        } catch (error) {
            next(errorApi.badRequest(error.message))
        }
    }

    async updateProduct(req, res, next) {
        try {
            const { id } = req.params
            let { name, price, image: fileName, categoryId } = req.body

            categoryId = categoryId || 0; 
            
            const product = await Product.update({ name, price, image: fileName, categoryId }, { where: { id } })
            product
                ? res.status(200).json({ succes: true })
                : next(errorApi.notFoundRequest("Product not found"))
        } catch (error) {
            next(errorApi.badRequest(error.message))
        }

    }
}

module.exports = new ProductController()