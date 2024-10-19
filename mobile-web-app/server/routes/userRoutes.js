// routes/userRoutes.js
const express = require('express');
const { signup } = require('../Controllers/userControllers');

const router = express.Router();

// Route to handle user signup
router.post('/signup', signup);

module.exports = router;
