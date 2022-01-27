const catalogsService = require('../services/categories.service')

class CategoriesController {
    async addNewCategory(req, res, next) {
        try {
            const body = req.body
            const category = await catalogsService.addNewCategory(body)
            return res.status(200).send(category)
        } catch (e) {
            next(e)
        }
    }

    async getAllCategories(req, res, next) {
        try {
            const categories = await catalogsService.getAllCategories()
            return res.status(200).send(categories)
        } catch (e) {
            next(e)
        }
    }
}


module.exports = new CategoriesController()