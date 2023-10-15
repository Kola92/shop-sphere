const { expect, app } = require('../test-setup');
const request = require('supertest');

describe('Product Controller', () => {
	it('should return a list of products', async () => {
		const res = await request(app).get('/products').expect(200);

		expect(res.body).to.be.an('array');
	});

	it('should create a new product', async () => {
		const newProduct = {
			name: 'Sample Product',
			description: 'A test product',
			price: 19.99,
		};

		const res = await request(app)
			.post('/products')
			.send(newProduct)
			.expect(201);

		expect(res.body).to.have.property('_id');
		expect(res.body.name).to.equal(newProduct.name);
	});

	// Test case to update an existing product
	it('should update an existing product', async () => {
		const updatedProduct = {
			name: 'Updated Product',
			description: 'An updated product',
			price: 29.99,
		};

		const productToUpdate = await request(app).get('/products').expect(200);

		const res = await request(app)
			.put(`/products/${productToUpdate.body[0]._id}`)
			.send(updatedProduct)
			.expect(200);

		expect(res.body.name).to.equal(updatedProduct.name);
	});

	// Test case to delete an existing product
	it('should delete an existing product', async () => {
		const productToDelete = await request(app).get('/products').expect(200);

		const res = await request(app)
			.delete(`/products/${productToDelete.body[0]._id}`)
			.expect(200);

		expect(res.body.message).to.equal('Product deleted successfully');
	});
});
