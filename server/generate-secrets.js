const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

// Define the path to your .env file
const envFilePath = path.join(__dirname, '.env'); // Update the path as needed

// Read the current content of the .env file
const currentEnvData = fs.readFileSync(envFilePath, 'utf8');

// Generate new secret keys
const refreshSecret = crypto.randomBytes(32).toString('hex');
const accessSecret = crypto.randomBytes(32).toString('hex');

// Prepare the updated content
const newEnvData = `
${currentEnvData}
# Additional secrets
REFRESH_TOKEN_SECRET=${refreshSecret}
ACCESS_TOKEN_SECRET=${accessSecret}
`;

// Write the updated content back to the .env file
fs.writeFileSync(envFilePath, newEnvData);

console.log('Secrets appended to .env file.');
