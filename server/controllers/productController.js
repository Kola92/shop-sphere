const Product = require('../models/products');

// Function to handle getting all products
exports.getAllProducts = async (req, res) => {
	try {
		const products = await Product.find();
		res.json(products);
	} catch (error) {
		res.status(500).json({ error: 'Failed to fetch products' });
	}
};

// Function to handle creating a product
exports.createProduct = async (req, res) => {
	try {
		const { name, description, price } = req.body;
		const product = new Product({ name, description, price, image, category });
		const savedProduct = await product.save();
		res.json(savedProduct);
	} catch (error) {
		res.status(500).json({ error: 'Failed to create the product' });
	}
};

// Add more controller functions as needed
