const db = require('../db')
const ApiError = require('../exceptions/api-error')
const bcrypt = require('bcrypt')
const uuid = require('uuid')

class AuthService {
    async registration(body) {
        if (!body.email || !body.password) {
            throw ApiError.ClientError('Заполните все поля')
        }
        const candidate = await db.query('SELECT * FROM users WHERE email = $1', [body.email])
        if (candidate.rows.length) {
            throw ApiError.ClientError(`Пользователь с email ${body.email} уже существует`)
        }
        const hashPassword = await bcrypt.hash(body.password, 8)
        await db.query('INSERT INTO users (email,password) values ($1,$2)',
            [body.email, hashPassword])
        return

    }

    async login(body) {
        const user = await db.query('SELECT * from users where email = $1', [body.email])
        if (!user.rows.length) {
            throw ApiError.ClientError("Укажите верный email")
        }
        const isValidPassword = await bcrypt.compare(body.password, user.rows[0].password)
        if (!isValidPassword) {
            throw ApiError.ClientError("Укажите верный пароль")
        }
        const sessionId = uuid.v4()
        const userSession = await db.query("Select * from sessions where user_id = $1",
            [user.rows[0].user_id])
        if (userSession.rows.length) {
            await db.query("UPDATE sessions set sessionId = $1 where user_id = $2",
                [sessionId, user.rows[0].user_id])
        } else {
            await db.query("INSERT into sessions (sessionId,user_id) values ($1,$2)",
                [sessionId, user.rows[0].user_id])
        }
        return {message: "Вы успешно вошли в свой аккаунт", sessionId}
    }

    async checkAuth(sessionId) {
        const session = await db.query("Select * from sessions where sessionId = $1", [sessionId])
        if (!session.rows.length) {
            throw ApiError.UnauthorizedError()
        }
        return session.rows[0]
    }
}

module.exports = new AuthService()