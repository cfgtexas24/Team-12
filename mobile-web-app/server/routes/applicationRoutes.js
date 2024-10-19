// routes/userRoutes.js
const express = require('express');
const { createApplication } = require('../Controllers/applicationControllers');

const router = express.Router();

// Route to handle user signup
router.post('/create', createApplication);
router.get('/', (req, res) => {
   res.send("Get Successful")
})

module.exports = router;