const { Category } = require('../db')
const errorApi = require('../error/errorApi')


class categoryController {
    async create(req, res, next) {
            let { name, parentId } = req.body

            const category = await Category.create({ name, parentId })
            res.status(201).json({
                category,
            })


    }

    async getAll(req, res, next) {
        try {
            const categories = await Category.findAll()
            res.status(200).json({
                categories
            })

        } catch (error) {
            next(errorApi.badRequest(error.message))
        }
    }

    async findCategory(req, res, next) {
        try {

            const { id } = req.params
            const category = await Category.findOne({ where: { id } })
            res.status(200).json({
                category
            })

        } catch (error) {
            next(errorApi.badRequest(error.message))

        }
    }

    async DeleteCategory(req, res, next) {
        try {
            const { id } = req.params
            await Category.destroy({ where: { id } })
            res.status(200).json({
                succes: true
            })
        } catch (error) {
            next(errorApi.badRequest(error.message))
        }

    }

    async updateCategory(req, res, next) {
        try {

            const { id } = req.params
            const { name } = req.body

            await Category.update({ name }, { where: { id } })
            res.status(200).json({
                succes: true
            })

        } catch (error) {
            next(errorApi.badRequest(error.message))

        }

    }
}

module.exports = new categoryController()