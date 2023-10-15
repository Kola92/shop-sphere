// order.js
const mongoose = require('mongoose');

// Define the order schema
const orderSchema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User', // Reference to the User model
	},
	products: [
		{
			product: {
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Product', // Reference to the Product model
			},
			quantity: Number,
		},
	],
	orderDate: {
		type: Date,
		default: Date.now,
	},
});

// Create the order model
const Order = mongoose.model('Order', orderSchema);

// Export the model
module.exports = Order;
