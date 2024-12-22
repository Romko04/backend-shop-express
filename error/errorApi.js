class ErrorApi extends Error {
    constructor (status, message) {
        super()
        this.status = status
        this.message = message
    }
    static notFoundRequest(message){
        return new ErrorApi('404', message)
    }
    static badRequest(message){
        return new ErrorApi('400', message)
    }
    static unauthorized(message) {
        return new ErrorApi(401, message);
    }

    static forbidden(message) {
        return new ErrorApi(403, message);
    }

}

module.exports = ErrorApi