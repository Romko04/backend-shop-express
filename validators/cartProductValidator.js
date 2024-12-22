const { body } = require('express-validator');

const productCartValidationRules = [
    body('productId')
        .notEmpty()
        .withMessage('Product ID is required')
        .isInt()
        .withMessage('Product ID must be an integer'),
    body('quantity')
        .notEmpty()
        .withMessage('Quantity is required')
        .isInt()
        .withMessage('Quantity must be an integer'),
];

module.exports = productCartValidationRules;
