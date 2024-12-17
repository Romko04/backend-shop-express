const { body } = require('express-validator');

const productValidationRules = [
    body('name')
        .notEmpty()
        .withMessage('Name is required')
        .isString()
        .withMessage('Name must be a string'),
    body('price')
        .notEmpty()
        .withMessage('Price is required')
        .isFloat({ min: 0 })
        .withMessage('Price must be a positive number'),
    body('caregoryId')
        .notEmpty()
        .withMessage('Category ID is required')
        .isInt()
        .withMessage('Category ID must be an integer'),
];

module.exports = productValidationRules;
