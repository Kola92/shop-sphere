const handleErrors = (err, req, res, next) => {
	console.error(err.stack); // Log the error for debugging

	res.status(500).json({
		error: 'Internal Server Error',
	});
};

module.exports = { handleErrors };
