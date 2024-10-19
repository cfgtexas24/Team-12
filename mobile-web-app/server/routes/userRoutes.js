// routes/userRoutes.js
const express = require('express');
const { signup, getusers, getuser } = require('../Controllers/userControllers');

const router = express.Router();

// Route to handle user signup
router.post('/signup', signup);
router.get('/users', getusers)
router.get('/users/:username', getuser)

module.exports = router;