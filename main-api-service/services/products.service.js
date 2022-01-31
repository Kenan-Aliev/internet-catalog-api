const db = require('../db')
const ApiError = require('../exceptions/api-error')
const authService = require('./auth.service')

class ProductsService {
    async addNewProduct(body, sessionId) {
        if (!body.name || !body.category_id) {
            throw ApiError.ClientError('Укажите название продукта и его категорию')
        }
        await authService.checkAuth(sessionId)
        const candidate = await db.query('Select * from products where lower(product_name) = $1',
            [body.name.toLowerCase()])
        if (candidate.rows.length) {
            throw ApiError.ClientError("Такой продукт уже существует")
        }
        const product = await db.query(`Insert into products (product_name,category_id) 
                                                 values ($1,$2) returning *`, [body.name, body.category_id])
        return product.rows[0]
    }

    async getAllProducts(categoryId) {
        let products
        if (categoryId) {
            products = await db.query(`Select * from products where category_id = $1 order by product_id`,
                [categoryId])
        } else {
            products = await db.query(`Select * from products order by product_id`)
        }
        return products.rows
    }

    async getProductById(productId) {
        const product = await db.query(`Select * from products 
                                        where product_id = $1`, [productId])
        return product.rows[0]
    }


    async deleteProduct(productId, sessionId) {
        await authService.checkAuth(sessionId)
        const result = await db.query(`Delete from products where product_id = $1`, [productId])
        if (!result.rowCount) {
            throw  ApiError.ClientError('Такого товара не существует')
        }
        return result.rowCount
    }
}


module.exports = new ProductsService()