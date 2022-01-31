const authService = require('../services/auth.service')

class AuthController {
    async registration(req, res, next) {
        try {
            const body = req.body
            const response = await authService.registration(body)
            return res.send(response.data.message)
        } catch (e) {
            console.log(e)
            next(e)
        }
    }

    async login(req, res, next) {
        try {
            const body = req.body
            const response = await authService.login(body)
            req.session.sessionId = response.data.sessionId
            req.session.isAuth = true
            return res.send(response.data.message)
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new AuthController()