const { body } = require('express-validator');

const ratingValidationRules = [
    body('ratingId')
        .notEmpty()
        .withMessage('Rating is required')
        .isNumeric()
        .withMessage('Rating must be a number'),
    body('productId')
        .notEmpty()
        .withMessage('Product id is required')
        .isNumeric()
        .withMessage('Product id must be a number'),
    body('userId')
        .notEmpty()
        .withMessage('User id is required')
        .isNumeric()
        .withMessage('User id must be a number'),
];

module.exports = ratingValidationRules;
