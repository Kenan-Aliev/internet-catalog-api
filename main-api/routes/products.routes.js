const express = require('express')
const router = express.Router()

const productsController = require('../controllers/products.controller')


router.post('/add', productsController.addNewProduct)
router.get('/getAllProducts', productsController.getAllProducts)
router.delete('/delete/:productId', productsController.deleteProduct)

module.exports = router
