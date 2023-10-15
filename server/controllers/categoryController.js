const Category = require('../models/category');

// Create a new category
const createCategory = async (req, res) => {
	try {
		const { name, description } = req.body;
		const category = new Category({ name, description });
		const savedCategory = await category.save();
		res.json(savedCategory);
	} catch (error) {
		res.status(500).json({ error: 'Failed to create the category' });
	}
};

// Get a list of all categories
const getAllCategories = async (req, res) => {
	const categories = await Category.find();
	res.json(categories);
};

// Get category by ID
const getCategoryById = async (req, res) => {
	const category = await Category.findById(req.params.categoryId);
	if (!category) {
		return res.status(404).json({ error: 'Category not found' });
	}
	res.json(category);
};

// Update category by ID
const updateCategoryById = async (req, res) => {
	const { name, description } = req.body;
	const updatedCategory = await Category.findByIdAndUpdate(
		req.params.categoryId,
		{ name, description },
		{ new: true }
	);
	res.json(updatedCategory);
};

// Delete category by ID
const deleteCategoryById = async (req, res) => {
	await Category.findByIdAndRemove(req.params.categoryId);
	res.json({ message: 'Category deleted' });
};

module.exports = {
	createCategory,
	getAllCategories,
	getCategoryById,
	updateCategoryById,
	deleteCategoryById,
};
