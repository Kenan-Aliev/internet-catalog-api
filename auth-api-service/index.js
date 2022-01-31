const express = require('express')
const authServer = express()
const exceptionMiddleware = require('./exceptions/middlewares/auth-exception-middleware')
const authRoutes = require('./routes/index')

require('dotenv').config()


const PORT = process.env.AUTH_PORT || 5000


authServer.use(express.json())
authServer.use(authRoutes)
authServer.use(exceptionMiddleware)


const start = async () => {
    authServer.listen(PORT, () => {
        console.log('Server started on PORT ' + PORT)
    })
}

start()






