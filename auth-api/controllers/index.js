const authService = require('../services/index')

class AuthController {
    async registration(req, res, next) {
        try {
            const body = req.body
            await authService.registration(body)
            return res.status(200).send({message: 'Пользователь успешно прошел регистрацию'})
        } catch (e) {
            next(e)
        }
    }

    async login(req, res, next) {
        try {
            const body = req.body
            const result = await authService.login(body)
            return res.status(200).send(result)
        } catch (err) {
            next(err)
        }
    }

    async checkAuth(req, res, next) {
        try {
            const {sessionId} = req.params
            const result = await authService.checkAuth(sessionId)
            return res.status(200).send({message: "Пользователь авторизован", sessionData: result})
        } catch (err) {
            next(err)
        }
    }

}

module.exports = new AuthController()