const mongoose = require('mongoose');
const { expect } = require('chai');
const app = require('../server');
const sinon = require('sinon');

before(async () => {
	// Start an in-memory MongoDB server
	mongoServer = new MongoMemoryServer();
	const mongoUri = await mongoServer.getUri();

	// Initialize Mongoose with the test database URI
	await mongoose.connect(mongoUri, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	});
});

after(async () => {
	// Close the database connection and stop the in-memory MongoDB server
	await mongoose.disconnect();
	await mongoServer.stop();
});

// Mock the database service
const mockDatabaseService = sinon.stub(databaseService, 'find');
mockDatabaseService.returns([{ _id: '1', name: 'Mocked Product' }]);

module.exports = { expect, app };
