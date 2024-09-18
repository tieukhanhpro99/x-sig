const express = require('express');
const crypto = require('crypto-js');
const { v4: uuidv4 } = require('uuid'); // Import the v4 method from the uuid package

const app = express();
const port = 3000; // You can change this port if needed

// Function to generate a random string (nonce)
function generateRandomString(length = 16) {
    const characters = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}

// Endpoint to handle GET request
app.get('/generate-signature', (req, res) => {
    const apiKey = 'CvJA42rUo5Wf7XPi3pZQwITGHRb2ok66';
    const timestamp = Math.floor(Date.now() / 1000);
    const nonce = uuidv4(); // Generate a new nonce for every request

    // Concatenate the string for HMAC
    const message = `api_key=${apiKey}&timestamp=${timestamp}&nonce=${nonce}`;

    // Generate the HMAC SHA256 hash
    const signature = crypto.HmacSHA256(message, apiKey).toString();

    // Respond with the necessary values
    res.json({
        unixtime: timestamp,
        nonce: nonce,
        'x-signature': signature
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
