const ApiError = require('../api-error')

module.exports = function (err, req, res, next) {
    if (err) {
        if (err.response && (err.response.status === 400 || err.response.status === 401 || err.response.status === 500)) {
            return res.status(err.response.status).send(err.response.data.message)
        } else if (err instanceof ApiError) {
            return res.status(err.status).send(err.message)
        } else {
            return res.status(500).send("Server error")
        }
    } else {
        next()
    }
}
