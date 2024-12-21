const { body } = require('express-validator');

const userRegistrationValidationRules = [
    body('firstName')
        .notEmpty()
        .withMessage('First Name is required')
        .isString()
        .withMessage('First Name must be a string')
        .isLength({ min: 3 })
        .withMessage('First Name must be at least 3 characters long'),
    body('password')
        .notEmpty()
        .withMessage('Password is required')
        .isString()
        .withMessage('Password must be a string')
        .isLength({ min: 8 })
        .withMessage('Password must be at least 8 characters long')
        .matches(/\S/)
        .withMessage('Password must not contain spaces'),
    body('email')
        .notEmpty()
        .withMessage('Email is required')
        .isEmail()
        .withMessage('Not valid email')
];

module.exports = userRegistrationValidationRules;