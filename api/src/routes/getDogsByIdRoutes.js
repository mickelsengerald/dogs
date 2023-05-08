const express = require('express');
const router = express.Router();
const { getDogById } = require('../controllers/getDogsByIdController');

router.get('/:id', getDogById);

module.exports = router;