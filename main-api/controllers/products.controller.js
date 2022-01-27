const productsService = require('../services/products.service')

class ProductsController {
    async addNewProduct(req, res, next) {
        try {
            const body = req.body
            const sessionId = req.session.sessionId
            const product = await productsService.addNewProduct(body, sessionId)
            return res.status(200).send(product)
        } catch (e) {
            next(e)
        }
    }

    async getAllProducts(req, res, next) {
        try {
            const categoryId = req.query.categoryId
            const products = await productsService.getAllProducts(categoryId)
            return res.status(200).send(products)
        } catch (e) {
            next(e)
        }
    }


    async deleteProduct(req, res, next) {
        try {
            const productId = Number(req.params.productId)
            const sessionId = req.session.sessionId
            await productsService.deleteProduct(productId, sessionId)
            return res.status(200).send({message: "Товар успешно удален"})
        } catch (e) {
            next(e)
        }
    }
}


module.exports = new ProductsController()