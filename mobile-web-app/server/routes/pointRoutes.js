const express = require('express');
const router = express.Router();
const { addPoint, pointLookup } = require('../Controllers/pointController');

router.get('/hello', () => console.log("hello"))
router.post('/pointLookupAdd', addPoint);
router.get('/pointLookup', pointLookup);

module.exports = router;