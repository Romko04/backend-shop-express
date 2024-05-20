class ErrorApi extends Error {
    constructor (status, message) {
        super()
        this.status = status
        this.message = message
    }
    static badRequest(message){
        return new ErrorApi('404', message)
    }
}

module.exports = ErrorApi