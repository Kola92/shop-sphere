const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const rateLimit = require('express-rate-limit');
const session = require('express-session');
const setupSwagger = require('./documentation/swagger');

const productsRouter = require('./routes/productsRoutes');
const usersRoutes = require('./routes/usersRoutes');
const ordersRoutes = require('./routes/ordersRoutes');
const categoriesRoutes = require('./routes/categoriesRoutes');
const authRoutes = require('./routes/authRoutes');
const { handleErrors } = require('./middleware/errorMiddleware');

dotenv.config(); // Load environment variables from a .env file if present

// Database connection
mongoose.connect(process.env.MONGO_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

// Check the connection
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
	console.log('Connected to the database');
});

const app = express();
const port = process.env.PORT || 3000; // Set the port or use 3000 as the default

// Middlewares
app.use(cors()); // Enable CORS
app.use(helmet()); // Enhance your app's security
app.use(bodyParser.json()); // Parse JSON requests

// Basic route for testing
app.get('/', (req, res) => {
	res.send('Hello, Shopsphere E-commerce Backend!');
});

// Implement rate limiting to prevent abuse
const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100, // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Enable CORS with appropriate configuration
app.use(
	cors({
		origin: 'https://yourclientapp.com',
		methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
		credentials: true,
	})
);

// Implement a Content Security Policy
// app.use(
// 	csp({
// 		directives: {
// 			defaultSrc: ["'self'"],
// 			scriptSrc: ["'self'", 'trusted-cdn.com'],
// 			// Add other directives as needed
// 		},
// 	})
// );

// Use secure cookies and sessions
app.use(
	session({
		secret: 'your-secret-key',
		resave: false,
		saveUninitialized: true,
		cookie: {
			secure: true, // Set to true if your app uses HTTPS
			httpOnly: true,
			// Other cookie settings
		},
	})
);

// Routes setup middlewares
app.use('/products', productsRouter);
app.use('/orders', ordersRoutes);
app.use('/categories', categoriesRoutes);
app.use('/users', usersRoutes);
app.use('/auth', authRoutes);

// Use the error handling middleware
app.use(handleErrors);

// Add the Swagger documentation setup
setupSwagger(app);

// Start the server
app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
