const express = require('express')
const router = express.Router()

const categoryController = require('../controllers/categories.controller')

router.post('/add', categoryController.addNewCategory)
router.get('/getAll', categoryController.getAllCategories)


module.exports = router