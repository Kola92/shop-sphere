const mongoose = require('mongoose');

// Define the category schema
const categorySchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	description: String,
});

// Create the category model
const Category = mongoose.model('Category', categorySchema);

// Export the model
module.exports = Category;
