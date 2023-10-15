const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const { validateCreateCategory } = require('../middleware/validationMiddleware');

/**
 * @swagger
 * /categories:
 *   post:
 *     summary: Create a new category
 *     description: Create a new category with the provided details.
 *     parameters:
 *       - name: name
 *         description: Name of the category
 *         in: formData
 *         required: true
 *         type: string
 *     responses:
 *       201:
 *         description: The created category
 *       400:
 *         description: Invalid category data
 *       500:
 *         description: Internal server error
 *
 *   get:
 *     summary: Get all categories
 *     description: Retrieve a list of all available categories.
 *     responses:
 *       200:
 *         description: An array of categories
 *       500:
 *         description: Internal server error
 *
 *   get:
 *     summary: Get category by ID
 *     description: Retrieve a category by its unique identifier.
 *     parameters:
 *       - name: categoryId
 *         description: ID of the category to retrieve
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: The requested category
 *       404:
 *         description: Category not found
 *       500:
 *         description: Internal server error
 *    
 *   put:
 *     summary: Update category by ID
 *     description: Update a category with the provided details.
 *     parameters:
 *       - name: categoryId
 *         description: ID of the category to update
 *         in: path
 *         required: true
 *         type: string
 *       - name: name
 *         description: Name of the category
 *         in: formData
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: The updated category
 *       404:
 *         description: Category not found
 *       500:
 *         description: Internal server error
 *   
 *   delete:
 *     summary: Delete category by ID
 *     description: Delete a category by its unique identifier.
 *     parameters:
 *       - name: categoryId
 *         description: ID of the category to delete
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       204:
 *         description: Category deleted
 *       404:
 *         description: Category not found
 *       500:
 *         description: Internal server error
 */

// Create a new category
router.post('/', validateCreateCategory, categoryController.createCategory);

// Get all categories
router.get('/', categoryController.getAllCategories);

// Get category by ID
router.get('/:categoryId', categoryController.getCategoryById);

// Update category by ID
router.put('/:categoryId', categoryController.updateCategoryById);

// Delete category by ID
router.delete('/:categoryId', categoryController.deleteCategoryById);

module.exports = router;
