const userFavoriteProductsService = require('../services/userFavoriteProducts.service')

class UserFavoriteProductsController {
    async add(req, res, next) {
        try {
            const {productId} = req.query
            const sessionId = req.session.sessionId
            const result = await userFavoriteProductsService.add(Number(productId), sessionId)
            return res.status(200).send({message: "Товар успешно добавлен в избранные", result})
        } catch (e) {
            next(e)
        }
    }

    async getFavorites(req, res, next) {
        try {
            const sessionId = req.session.sessionId
            const favorites = await userFavoriteProductsService.getFavorites(sessionId)
            return res.status(200).send(favorites)
        } catch (e) {
            next(e)
        }

    }
}


module.exports = new UserFavoriteProductsController()