const errorApi = require('../error/errorApi')
const { query, validationResult } = require('express-validator');


const productMiddleware = (req, res, next) => {

    const result = validationResult(req);

    if (result.isEmpty()) {
      return next()
    } 

    next(errorApi.badRequest({ errors: result.array() }))

}

module.exports = productMiddleware