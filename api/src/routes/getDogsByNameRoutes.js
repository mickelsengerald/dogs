const express = require('express');
const router = express.Router();
const { getDogsByName } = require('../controllers/getDogsByNameController');

router.get('/search/:name', getDogsByName);

module.exports = router;
