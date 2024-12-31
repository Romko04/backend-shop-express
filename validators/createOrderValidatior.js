const { body } = require('express-validator');

const productValidationRules = [
    body('name')
        .notEmpty()
        .withMessage('Name is required')
        .isString()
        .withMessage('Name must be a string'),
    body('phone')
        .notEmpty()
        .withMessage('Phone is required')
        .isString()
        .withMessage('Phone must be a string'),
    body('address')
        .notEmpty()
        .withMessage('Address is required')
        .isString()
        .withMessage('Address must be a string'),
];

module.exports = productValidationRules;
