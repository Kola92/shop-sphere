const jwt = require('jsonwebtoken');

// Middleware to verify and authenticate JWT token
function authenticateToken(req, res, next)
{
	// Get the JWT_SECRET from environment variables
	const jwtSecret = process.env.JWT_SECRET;

	// Get the token from the request header or query parameter or cookie, adjust this based on your needs
	const token =
		req.header('x-auth-token') || req.query.token || req.cookies.token;

	if (!token) {
		return res
			.status(401)
			.json({ message: 'Access denied. No token provided.' });
	}

	// Verify the token
	jwt.verify(token, jwtSecret, (err, user) => {
		if (err) {
			return res.status(403).json({ message: 'Invalid token.' });
		}
		// Attach the user from the token to the request object for later use in the route handlers
		req.user = user;
		next();
	});
}

module.exports = { authenticateToken };
