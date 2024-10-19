// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const applicationRoutes = require('./routes/applicationRoutes');
require('dotenv').config();
const session = require('express-session');

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(cors({
  origin: 'http://localhost:3000', // or whatever port your React app is running on
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Use session middleware
app.use(session({
  secret: process.env.SESSION_SECRET,  // Make sure to use a strong secret key in production
  resave: false,              // Prevents the session from being saved back to the store if not modified
  saveUninitialized: false,   // Don't save a session if it hasn't been initialized
  cookie: { secure: false }   // Set to true if using HTTPS, otherwise set to false for local development
}));

// Other middleware and routes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  console.error('MONGODB_URI is not defined in the environment variables.');
  process.exit(1);
}

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected successfully'))
.catch((err) => {
  console.error('MongoDB connection error:', err);
  process.exit(1);
});


app.use('/api/users', userRoutes);
app.use('/api/applications', applicationRoutes)

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
