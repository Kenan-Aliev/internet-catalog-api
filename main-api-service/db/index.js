const Pool = require('pg').Pool
require('dotenv').config()

const pool = new Pool({
    user: process.env.POSTGRES_MAIN_USER,
    password: process.env.POSTGRES_MAIN_PASSWORD,
    database: process.env.POSTGRES_MAIN_DATABASE,
    host: process.env.POSTGRES_MAIN_HOST,
    port: Number(process.env.POSTGRES_MAIN_PORT)
})


module.exports = pool