require('dotenv').config();
const twilio = require('twilio');

// Twilio credentials (replace these values with your actual credentials or use .env)
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;
const recipientPhoneNumber = process.env.RECIPENT_PHONE_NUMBER;

const client = new twilio(accountSid, authToken);

// Sending SMS
client.messages
  .create({
    body: 'Hello from Twilio, this is a test message.',
    from: twilioPhoneNumber,      // Your Twilio phone number
    to: recipientPhoneNumber,     // The recipient's phone number
  })
  .then((message) => {
    console.log('Message SID:', message.sid);
    console.log('Message sent successfully.');
  })
  .catch((error) => {
    console.error('Error sending SMS:', error);
  });
