const { Brand } = require('../db')
const errorApi = require('../error/errorApi')


class BrandController {
        async create(req, res, next) {
            const { name } = req.body
            const brand = await Brand.create({
                name
            })
            res.status(200).json({
                brand
            })
        }

    async getAll(req, res) {
        try {
            const brands = await Brand.findAll()
            res.status(200).json({
                brands
            })
        } catch (error) {
            res.send(error)
        }
    }

    async findBrand(req, res) {
        const { id } = req.params
        const brand = await Brand.findOne({ where: { id } })
        res.status(200).json({
            brand
        })
    }

    async DeleteBrand(req, res) {
        const { id } = req.params

        await Brand.destroy({ where: { id } })
        res.status(200).json({
            succes: true
        })

    }

    async updateBrand(req, res, next) {
        const { id } = req.params
        const { name } = req.body

        if (!name || !id) return next(errorApi.badRequest('Поля "id" та "name" Обов\`язкові'))

        await Brand.update({ name }, { where: { id } })
        res.status(200).json({
            succes: true
        })

    }
}

module.exports = new BrandController()