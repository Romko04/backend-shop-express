const { body } = require('express-validator');

const productCartValidationRules = [
    body('quantity')
        .notEmpty()
        .withMessage('Quantity is required')
        .isInt({ min: 1 })
        .withMessage('Quantity must be an integer'),
];

module.exports = productCartValidationRules;
