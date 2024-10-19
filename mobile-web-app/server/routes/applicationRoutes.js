// routes/userRoutes.js
const express = require('express');
const { createApplication } = require('../Controllers/applicationControllers');

const router = express.Router();

// Route to handle user signup
router.post('/application/create', createApplication);

module.exports = router;

// {
//     "application_details":  "Always jiggy yunno"
// }