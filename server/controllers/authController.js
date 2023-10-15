const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Get the JWT_SECRET from environment variables
const jwtSecret = process.env.JWT_SECRET;

// Register a new user
async function register(req, res) {
	try {
		// Check if the user already exists
		const userExists = await User.findOne({ email: req.body.email });
		if (userExists) {
			return res.status(400).json({ message: 'User already exists.' });
		}

		// Hash the password
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(req.body.password, salt);

		// Create a new user
		const user = new User({
			email: req.body.email,
			password: hashedPassword,
		});

		// Save the user to the database
		const savedUser = await user.save();

		// Create and sign a JWT
		const token = jwt.sign({ _id: savedUser._id }, jwtSecret);

		// Return the user and token
		res.status(201).json({ user: savedUser, token });
	} catch (error) {
		res.status(500).json({ error: 'Failed to register user' });
	}
}

// Log in a user
async function login(req, res) {
	try {
		// Check if the user exists
		const user = await User.findOne({ email: req.body.email });
		if (!user) {
			return res.status(400).json({ message: 'User not found.' });
		}

		// Check if the password is correct
		const validPassword = await bcrypt.compare(
			req.body.password,
			user.password
		);
		if (!validPassword) {
			return res.status(400).json({ message: 'Invalid password.' });
		}

		// Create and sign a JWT
		const token = jwt.sign({ _id: user._id }, jwtSecret);

		// Return the token
		res.status(200).json({ token });
	} catch (error) {
		res.status(500).json({ error: 'Login failed.' });
	}
}

const refreshToken = async (req, res) => {
	try {
		const refreshToken = req.cookies.refreshToken;

		// Verify the refresh token
		const user = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

		// Issue a new access token
		const accessToken = jwt.sign(
			{ userId: user.userId },
			process.env.ACCESS_TOKEN_SECRET,
			{
				expiresIn: '15m', // Set the expiration time
			}
		);

		// Send the new access token in the response
		res.json({ accessToken });

		// Generate and send a refresh token
		res.cookie('refreshToken', refreshToken, { httpOnly: true });
	} catch (error) {
		res.status(403).json({ message: 'Invalid refresh token' });
	}
};

const logout = async (req, res) => {
	// Clear the refresh token cookie
	res.clearCookie('refreshToken');

	// You can also maintain a blacklist or invalidate the refresh token here

	res.json({ message: 'Logged out successfully' });
};

module.exports = {
	register,
	login,
	refreshToken,
	logout,
};
