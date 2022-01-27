const axios = require('axios')


class AuthService {
    async registration(body) {
        const response = await axios.post(`${process.env.AUTH_URL}/registration`, body)
        return response
    }

    async login(body) {
        const response = await axios.post(`${process.env.AUTH_URL}/login`, body)
        return response
    }

    async checkAuth(userSessionId) {
        const response = await axios.get(`${process.env.AUTH_URL}/checkAuth/${userSessionId}`)
        return response.data
    }
}


module.exports = new AuthService()