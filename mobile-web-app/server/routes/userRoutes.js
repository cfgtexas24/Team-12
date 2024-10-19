// routes/userRoutes.js
const express = require('express');
const { signup, getusers, getuser, login } = require('../Controllers/userControllers');
const bcrypt = require('bcryptjs');

const router = express.Router();

// Route to handle user signup
router.post('/create', signup);
router.post('/login', login);
router.get('/', getusers)
router.get('/:username', getuser)
router.get('/salt', async (req, res) => {
    const salt = await bcrypt.genSalt(10);
    res.send(salt)
})

module.exports = router;