// routes/userRoutes.js
const express = require('express');
const { signup, getusers, getuser } = require('../Controllers/userControllers');

const router = express.Router();

// Route to handle user signup
router.post('/create', signup);
router.get('/', getusers)
router.get('/:username', getuser)

module.exports = router;