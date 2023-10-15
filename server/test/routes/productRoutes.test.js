const request = require('supertest');
const app = require('../server'); // Import your Express app
const mongoose = require('mongoose');
const Product = require('../../models/products'); // Import your Product model

// Helper function to create a sample product
async function createSampleProduct() {
	const product = new Product({
		name: 'Sample Product',
		description: 'A test product',
		price: 19.99,
	});
	return await product.save();
}

describe('Product Routes', () => {
	// Before running the tests, create a sample product
	let sampleProduct;

	before(async () => {
		await mongoose.connect(global.__MONGO_URI__, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});

		sampleProduct = await createSampleProduct();
	});

	// After running the tests, clean up and disconnect from the database
	after(async () => {
		await Product.deleteMany({});
		await mongoose.disconnect();
	});

	// Test case to create a new product
	it('should create a new product', async () => {
		const newProduct = {
			name: 'New Product',
			description: 'A new product',
			price: 29.99,
		};

		const res = await request(app)
			.post('/products')
			.send(newProduct)
			.expect(201);

		const createdProduct = res.body;
		expect(createdProduct).to.have.property('_id');
		expect(createdProduct.name).to.equal(newProduct.name);
	});

	// Test case to update an existing product
	it('should update an existing product', async () => {
		const updatedProduct = {
			name: 'Updated Product',
			description: 'An updated product',
			price: 39.99,
		};

		const res = await request(app)
			.put(`/products/${sampleProduct._id}`)
			.send(updatedProduct)
			.expect(200);

		const updatedProductResponse = res.body;
		expect(updatedProductResponse.name).to.equal(updatedProduct.name);
	});

	// Test case to delete an existing product
	it('should delete an existing product', async () => {
		const res = await request(app)
			.delete(`/products/${sampleProduct._id}`)
			.expect(200);

		const deleteResponse = res.body;
		expect(deleteResponse.message).to.equal('Product deleted successfully');
	});
});
