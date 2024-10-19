require('dotenv').config(); // Load environment variables from .env
const cors = require('cors');
app.use(cors());

// Import necessary modules
const express = require('express');
const mongoose = require('mongoose');
const twilio = require('twilio');

// Initialize Express app
const app = express();
const PORT = 5001;
const TWILIOPORT = 8081; 

// Middleware
app.use(express.json()); // Allows us to parse incoming JSON requests

// MongoDB connection
const MONGO_URI = process.env.MONGODB_URI;

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected successfully'))
.catch((err) => console.error('MongoDB connection error:', err));

// Twilio setup
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;

// Log to ensure environment variables are loaded
if (!accountSid || !authToken || !twilioPhoneNumber) {
  console.error("Twilio credentials are missing. Please check the .env file.");
  console.log('var1%s', accountSid); 
  console.log('var2%s', authToken); 
  console.log('var3%s', twilioPhoneNumber); 
} else {
  console.log("Twilio credentials loaded successfully.");
}

const client = new twilio(accountSid, authToken);

// Route for testing Twilio setup
app.get('/test-twilio', (req, res) => {
  client.messages
    .create({
      body: 'Hello from Twilio, this is a test message.',
      from: twilioPhoneNumber,
      to: '+1234567890' // Replace with a valid phone number for testing
    })
    .then(message => {
      console.log('SMS sent:', message.sid);
      res.status(200).send('SMS sent successfully');
    })
    .catch(error => {
      console.error('Error sending SMS:', error);
      res.status(500).send('Error sending SMS');
    });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
