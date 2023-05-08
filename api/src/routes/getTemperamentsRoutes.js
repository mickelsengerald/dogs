const express = require('express');
const router = express.Router();
const { getTemperamentsFromDatabase } = require('../controllers/temperamentsController');

router.get('/', async (req, res, next) => {
  try {
    const temperaments = await getTemperamentsFromDatabase();
    res.json(temperaments);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
