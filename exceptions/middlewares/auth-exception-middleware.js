const ApiError = require('../api-error')

module.exports = function (err, req, res, next) {
    if (err) {
        if (err instanceof ApiError) {
            return res.status(err.status).send({message: err.message})
        }
        return res.status(500).send({message: 'Server error'})
    } else {
        next()
    }
}