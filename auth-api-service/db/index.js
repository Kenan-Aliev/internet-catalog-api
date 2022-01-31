const Pool = require('pg').Pool
require('dotenv').config()

const pool = new Pool({
    user: process.env.POSTGRES_AUTH_USER,
    password: process.env.POSTGRES_AUTH_PASSWORD,
    database: process.env.POSTGRES_AUTH_DATABASE,
    host: process.env.POSTGRES_AUTH_HOST,
    port: Number(process.env.POSTGRES_AUTH_PORT)
})


module.exports = pool