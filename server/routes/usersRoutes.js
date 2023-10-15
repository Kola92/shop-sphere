const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { validateCreateUser } = require('../middleware/validationMiddleware');

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create a new user
 *     description: Create a new user with the provided details.
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
 *       400:
 *         description: Invalid user data
 *       500:
 *         description: Internal server error
 *
 *   get:
 *     summary: Get all users
 *     description: Retrieve a list of all users.
 *     responses:
 *       200:
 *         description: An array of users
 *       500:
 *         description: Internal server error
 *
 * /users/{userId}:
 *   get:
 *     summary: Get user by ID
 *     description: Retrieve a user by their unique identifier.
 *     parameters:
 *       - name: userId
 *         description: ID of the user to retrieve
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: The requested user
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 *    
 *   put:
 *     summary: Update user by ID
 *     description: Update a user with the provided details.
 *     parameters:
 *       - name: userId
 *         description: ID of the user to update
 *         in: path
 *         required: true
 *         type: string
 *       - name: email
 *         description: Email address of the user
 *         in: formData
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: The updated user
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 *   
 *   delete:
 *     summary: Delete user by ID
 *     description: Delete a user by their unique identifier.
 *     parameters:
 *       - name: userId
 *         description: ID of the user to delete
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       204:
 *         description: User deleted
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */

// Create a new user
router.post('/users', validateCreateUser, userController.createUser);

// Get all users
router.get('/users', userController.getAllUsers);

// Get user by ID
router.get('/users/:userId', userController.getUserById);

// Update user by ID
router.put('/users/:userId', userController.updateUserById);

// Delete user by ID
router.delete('/users/:userId', userController.deleteUserById);

module.exports = router;
