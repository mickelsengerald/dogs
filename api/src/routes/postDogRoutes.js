const express = require('express');
const router = express.Router();
const { createDog } = require('../controllers/postDogController');

router.post('/', createDog);

module.exports = router;

