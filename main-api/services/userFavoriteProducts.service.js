const authService = require('../services/auth.service')
const productService = require('../services/products.service')
const ApiError = require('../../exceptions/api-error')
const db = require('../../db/index')

class UserFavoriteProductsService {
    async add(productId, sessionId) {
        if (!productId) {
            throw ApiError.ClientError('Укажите Id товара')
        }
        const product = await productService.getProductById(productId)
        if (!product) {
            throw ApiError.ClientError('Такого товара не существует')
        }
        const data = await authService.checkAuth(sessionId)
        const candidate = await db.query(`Select * from user_product_favorite 
                                           where user_id = $1 AND product_id = $2`,
            [data.sessionData.user_id, productId])
        if (candidate.rows.length) {
            throw ApiError.ClientError('Такой товар уже существует в избранных')
        }
        const favorite = await db.query(`Insert into user_product_favorite (user_id,product_id)
                                           values($1,$2) returning *`, [data.sessionData.user_id, productId])
        return favorite.rows[0]
    }

    async getFavorites(sessionId) {
        const data = await authService.checkAuth(sessionId)
        const favorites = await db.query(`Select p.product_name,u.email,c.category_name 
                                          from users as u 
                                           JOIN user_product_favorite as up ON up.user_id = u.user_id
                                           JOIN products as p on up.product_id = p.product_id
                                           JOIN categories as c on p.category_id = c.category_id
                                           Where u.user_id = $1`,
            [data.sessionData.user_id])
        return favorites.rows
    }
}


module.exports = new UserFavoriteProductsService()