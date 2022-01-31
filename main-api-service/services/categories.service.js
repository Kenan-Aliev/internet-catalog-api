const db = require('../db')

class CategoriesService {
    async addNewCategory(body) {
        const category = await db.query(`INSERT INTO categories (category_name) values($1) returning *`, [body.name])
        return category
    }

    async getAllCategories() {
        const categories = await db.query(`Select * from categories order by category_id asc`)
        return categories.rows
    }
}


module.exports = new CategoriesService()