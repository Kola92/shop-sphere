const express = require('express');
const router = express.Router();
const Product = require('../models/products');
const productController = require('../controllers/productController');
const { validateCreateProduct } = require('../middleware/validationMiddleware');

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Get all products
 *     description: Retrieve a list of all available products.
 *     responses:
 *       200:
 *         description: A list of products
 *       500:
 *         description: Internal server error
 */

// Define routes
router.get('/', productController.getAllProducts);

/**
 * @swagger
 * /products:
 *   post:
 *     summary: Create a new product
 *     description: Create a new product with the provided details.
 *     parameters:
 *       - name: name
 *         description: Name of the product
 *         in: formData
 *         required: true
 *         type: string
 *       - name: description
 *         description: Description of the product
 *         in: formData
 *         required: true
 *         type: string
 *       - name: price
 *         description: Price of the product
 *         in: formData
 *         required: true
 *         type: number
 *     responses:
 *       201:
 *         description: The created product
 *       500:
 *         description: Internal server error
 */

router.post('/', productController.createProduct);

module.exports = router;
