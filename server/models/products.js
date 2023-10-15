const mongoose = require('mongoose');

// Define the product schema
const productSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	price: {
		type: Number,
		required: true,
	},
	image: {
		type: String,
		required: true,
	},
	category: {
		type: String,
	},
});

// Create the product model
const Product = mongoose.model('Product', productSchema);

// Export the model
module.exports = Product;
