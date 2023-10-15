// protectedController.js

const protectedRoute = (req, res) => {
	// Access the authenticated user data via req.user
	res.json({ message: 'This is a protected route', user: req.user });
};

module.exports = {
	protectedRoute,
};
