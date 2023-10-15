const fs = require('fs');
const crypto = require('crypto');

// Generate a random secret key
const secretKey = crypto.randomBytes(32).toString('hex');

// Define the content to be added to the .env file
const envContent = `JWT_SECRET=${secretKey}\n`;

// Write the content to the .env file
fs.writeFileSync('.env', envContent);

console.log('Secret key generated and saved to .env file.');
