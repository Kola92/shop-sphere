// routes/protected.js

const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/authMiddleware');
const protectedController = require('../controllers/protectedController');

/**
 * @swagger
 * /protected:
 *   get:
 *     summary: Access a protected route
 *     description: Access a route protected by authentication. Requires a valid JWT token.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Access granted
 *       401:
 *         description: Access denied (invalid token)
 */

// Protected route
router.get('/protected', authenticateToken, protectedController.protectedRoute);

module.exports = router;
