const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const { validateCreateOrder } = require('../middleware/validationMiddleware');

/**
 * @swagger
 * /orders:
 *   post:
 *     summary: Create a new order
 *     description: Create a new order with the provided details.
 *     parameters:
 *       - name: customerId
 *         description: ID of the customer placing the order
 *         in: formData
 *         required: true
 *         type: string
 *       - name: productIds
 *         description: IDs of the products in the order
 *         in: formData
 *         required: true
 *         type: array
 *     responses:
 *       201:
 *         description: The created order
 *       400:
 *         description: Invalid order data
 *       500:
 *         description: Internal server error
 *
 *   get:
 *     summary: Get all orders
 *     description: Retrieve a list of all orders.
 *     responses:
 *       200:
 *         description: An array of orders
 *       500:
 *         description: Internal server error
 *
 * /orders/{orderId}:
 *   get:
 *     summary: Get order by ID
 *     description: Retrieve an order by its unique identifier.
 *     parameters:
 *       - name: orderId
 *         description: ID of the order to retrieve
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: The requested order
 *       404:
 *         description: Order not found
 *       500:
 *         description: Internal server error
 *    
 *   put:
 *     summary: Update order by ID
 *     description: Update an order with the provided details.
 *     parameters:
 *       - name: orderId
 *         description: ID of the order to update
 *         in: path
 *         required: true
 *         type: string
 *       - name: status
 *         description: New status of the order
 *         in: formData
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: The updated order
 *       404:
 *         description: Order not found
 *       500:
 *         description: Internal server error
 *   
 *   delete:
 *     summary: Delete order by ID
 *     description: Delete an order by its unique identifier.
 *     parameters:
 *       - name: orderId
 *         description: ID of the order to delete
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       204:
 *         description: Order deleted
 *       404:
 *         description: Order not found
 *       500:
 *         description: Internal server error
 */

// Create a new order
router.post('/orders', validateCreateOrder, orderController.createOrder);

// Get all orders
router.get('/orders', orderController.getAllOrders);

// Get order by ID
router.get('/orders/:orderId', orderController.getOrderById);

// Update order by ID
router.put('/orders/:orderId', orderController.updateOrderById);

// Delete order by ID
router.delete('/orders/:orderId', orderController.deleteOrderById);

module.exports = router;
