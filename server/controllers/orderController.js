const Order = require('../models/orders');

// Create a new order
const createOrder = async (req, res) => {
	try {
		const order = new Order(req.body);
		const savedOrder = await order.save();
		res.json(savedOrder);
	} catch (error) {
		res.status(500).json({ error: 'Failed to create the order' });
	}
};

// Get a list of all orders
const getAllOrders = async (req, res) => {
	const orders = await Order.find();
	res.json(orders);
};

// Get order by ID
const getOrderById = async (req, res) => {
	const order = await Order.findById(req.params.orderId);
	if (!order) {
		return res.status(404).json({ error: 'Order not found' });
	}
	res.json(order);
};

// Update order by ID
const updateOrderById = async (req, res) => {
	const updatedOrder = await Order.findByIdAndUpdate(
		req.params.orderId,
		req.body,
		{ new: true }
	);
	res.json(updatedOrder);
};

// Delete order by ID
const deleteOrderById = async (req, res) => {
	await Order.findByIdAndRemove(req.params.orderId);
	res.json({ message: 'Order deleted' });
};

module.exports = {
	createOrder,
	getAllOrders,
	getOrderById,
	updateOrderById,
	deleteOrderById,
};

