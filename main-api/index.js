const express = require('express')
require('dotenv').config()
const session = require('express-session')
const authRoutes = require('./routes/auth.routes')
const categoryRoutes = require('./routes/categories.routes')
const productRoutes = require('./routes/products.routes')
const userFavoriteRoutes = require('./routes/userFavoriteProducts.routes')
const queries = require('../db/queries')
const exceptionMiddleware = require('../exceptions/middlewares/main-exception-middleware')

const mainServer = express()
const PORT = process.env.MAIN_PORT


mainServer.use(express.json())
mainServer.use(session({
    resave: false,
    saveUninitialized: false,
    secret: 'session-secret',
    cookie: {
        maxAge: 1000 * 60 * 10
    }
}))

mainServer.use('/auth', authRoutes)
mainServer.use('/categories', categoryRoutes)
mainServer.use('/products', productRoutes)
mainServer.use('/favorite', userFavoriteRoutes)
mainServer.use(exceptionMiddleware)

const start = async () => {
    await queries()
    mainServer.listen(PORT, () => {
        console.log('Server started on PORT ' + PORT)
    })
}


start()

