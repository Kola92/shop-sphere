const { body, validationResult } = require('express-validator');

// Validate for Registration route
const validateRegistration = [
	body('email').isEmail().withMessage('Invalid email address'),
	body('password')
		.isLength({ min: 6 })
		.withMessage('Password must be at least 6 characters long'),
	(req, res, next) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		next();
	},
];

// Validation for the login route
const validateLogin = [
	body('email').isEmail().withMessage('Invalid email address'),
	body('password')
		.isLength({ min: 6 })
		.withMessage('Password must be at least 6 characters long'),
	(req, res, next) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		next();
	},
];

// Validation middleware for creating a category
const validateCreateCategory = [
	body('name').isString().withMessage('Name must be a string'),
	(req, res, next) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		next();
	},
];

// Validation middleware for creating an order
const validateCreateOrder = [
	body('product').isString().withMessage('Product must be a string'),
	body('quantity').isInt().withMessage('Quantity must be an integer'),
	// Add more validations as needed
	(req, res, next) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		next();
	},
];

// Validation middleware for creating a product
const validateCreateProduct = [
	body('name').isString().withMessage('Name must be a string'),
	body('description').isString().withMessage('Description must be a string'),
	body('price').isNumeric().withMessage('Price must be a number'),
	// Add more validations as needed
	(req, res, next) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		next();
	},
];

// Validation middleware for creating a user
const validateCreateUser = [
	body('email').isEmail().withMessage('Invalid email address'),
	body('password')
		.isLength({ min: 6 })
		.withMessage('Password must be at least 6 characters long'),
	// Add more validations as needed
	(req, res, next) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		next();
	},
];

module.exports = {
	validateRegistration,
	validateLogin,
	validateCreateCategory,
	validateCreateOrder,
	validateCreateProduct,
	validateCreateUser,
};
