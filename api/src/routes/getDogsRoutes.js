const express = require('express');
const router = express.Router();
const { getDogs } = require('../controllers/getDogsController');

router.get('/', getDogs);

module.exports = router;