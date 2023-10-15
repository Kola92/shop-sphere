const express = require('express');
const router = express.Router();
const {
	validateRegistration,
	validateLogin,
} = require('../middleware/validationMiddleware');
const authController = require('../controllers/authController');

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     description: Register a new user with the provided details.
 *     parameters:
 *       - name: email
 *         description: Email address of the user
 *         in: formData
 *         required: true
 *         type: string
 *       - name: password
 *         description: Password for the user
 *         in: formData
 *         required: true
 *         type: string
 *     responses:
 *       201:
 *         description: The created user
 *       500:
 *         description: Internal server error
 *
 * /auth/login:
 *   post:
 *     summary: Log in a user
 *     description: Log in a user with the provided credentials.
 *     parameters:
 *       - name: email
 *         description: Email address of the user
 *         in: formData
 *         required: true
 *         type: string
 *       - name: password
 *         description: Password for the user
 *         in: formData
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: The authentication token
 *       400:
 *         description: User not found or invalid password
 *       500:
 *         description: Internal server error
 */

router.post('/refresh-token', authController.refreshToken);

// Register a new user
router.post('/register', validateRegistration, authController.register);

// Log in a user
router.post('/login', validateLogin, authController.login);

router.post('/logout', authController.logout);


module.exports = router;
