const { Brand } = require('../db')

class BrandController {

    async create(req, res) {
        try {
            const { name } = req.body
            if (name) {
                const brand = await Brand.create({
                    name
                })
                res.status(200).json({
                    brand
                })
            } else {
                res.send('Ви не вказали ім\`я')
            }
        } catch (error) {
            res.send(error)
        }
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
        try {
            const { id } = req.params
            if (id) {
                const brand = await Brand.findOne({ where: { id } })
                res.status(200).json({
                    brand
                })
            } else {
                res.send('Ви не вказали id')
            }
        } catch (error) {
            res.send(error)
        }
    }

    async DeleteBrand(req, res) {
        try {
            const { id } = req.params
            if (id) {
                const brand = await Brand.destroy({ where: { id } })
                res.status(200).json({
                    succes: true
                })
            } else {
                res.send('Ви не вказали id')
            }
        } catch (error) {
            res.send(error)
        }
    }

    async updateBrand(req, res) {
        try {
            const { id } = req.params
            const { name } = req.body

            if (id || name) {

                await Brand.update({ name }, { where: { id } })
                res.status(200).json({
                    succes: true
                })

            } else {
                res.send('Ви не вказали id або name')
            }
        } catch (error) {
            res.send(error)
        }
    }
}

module.exports = new BrandController()