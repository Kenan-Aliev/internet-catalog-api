class ApiError extends Error {
    message
    status

    constructor(message, status) {
        super(message);
        this.message = message
        this.status = status
    }

    static ClientError(message) {
        return new ApiError(message, 400)
    }

    static UnauthorizedError() {
        return new ApiError("Пользователь не авторизован", 401);
    }

}

module.exports = ApiError