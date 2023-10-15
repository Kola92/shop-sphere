const User = require('../models/user');

// Create a new user
const createUser = async (req, res) => {
	try {
		const { username, email, password } = req.body;
		const user = new User({ username, email, password });
		const savedUser = await user.save();
		res.json(savedUser);
	} catch (error) {
		res.status(500).json({ error: 'Failed to create the user' });
	}
};

// Get a list of all users
const getAllUsers = async (req, res) => {
	const users = await User.find();
	res.json(users);
};

// Get user by ID
const getUserById = async (req, res) => {
	const user = await User.findById(req.params.userId);
	if (!user) {
		return res.status(404).json({ error: 'User not found' });
	}
	res.json(user);
};

// Update user by ID
const updateUserById = async (req, res) => {
	const { username, email, password } = req.body;
	const updatedUser = await User.findByIdAndUpdate(
		req.params.userId,
		{ username, email, password },
		{ new: true }
	);
	res.json(updatedUser);
};

// Delete user by ID
const deleteUserById = async (req, res) => {
	await User.findByIdAndRemove(req.params.userId);
	res.json({ message: 'User deleted' });
};

module.exports = {
	createUser,
	getAllUsers,
	getUserById,
	updateUserById,
	deleteUserById,
};
