const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
	swaggerDefinition: {
		openapi: '3.0.0',
		info: {
			title: 'Shopsphere E-commerce API',
			version: '1.0.0',
			description:
				'API documentation for the Shopsphere E-commerce application.',
		},
	},
	apis: ['./routes/*.js'], // Add the path to your route files here
};

const specs = swaggerJsdoc(options);

module.exports = (app) => {
	app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
};
