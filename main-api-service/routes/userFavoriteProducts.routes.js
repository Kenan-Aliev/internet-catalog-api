const express = require('express')
const router = express.Router()

const userFavoriteProductsController = require('../controllers/userFavoriteProducts.controller')

router.post('/add', userFavoriteProductsController.add)
router.get('/getUsersFavorites', userFavoriteProductsController.getFavorites)


module.exports = router