const { Router } = require('express');
const getDogsRouter = require('./getDogsRoutes');
const getDogsByIdRouter = require('./getDogsByIdRoutes')
const getDogsByNameRouter = require('./getDogsByNameRoutes');
const postDogRouter = require('./postDogRoutes');
const getTemperamentsRouter = require('./getTemperamentsRoutes');

// Importar todos los routers;

const router = Router();

// Configurar los routers

router.use('/dogs', getDogsRouter);
router.use('/dogs', getDogsByIdRouter);
router.use('/dogs', getDogsByNameRouter);
router.use('/dogs', postDogRouter);
router.use('/temperaments', getTemperamentsRouter);


module.exports = router;
