const express = require('express')
const router = express.Router()
const authController = require('../controllers/index')

router.post('/registration', authController.registration)
router.post('/login', authController.login)
router.get('/checkAuth/:sessionId', authController.checkAuth)


module.exports = router