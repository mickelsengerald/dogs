const { Dog, Temperament } = require('../db');
const { getMaxApiDogId } = require('../helpers/helpers');  // Importar la función que obtiene el max ID de la API

const createDog = async (req, res, next) => {
  const { name, min_height, max_height, min_weight, max_weight, life_span, image, temperament } = req.body;
  try {
    // Obtén el ID más grande de los perros en la base de datos
    const maxDbDogId = await Dog.max('id');

    // Obtén el ID más grande de los perros en la API
    const maxApiDogId = await getMaxApiDogId();

    // El próximo ID será uno más que el ID más grande encontrado
    const nextId = Math.max(maxDbDogId, maxApiDogId) + 1;

    const createdDog = await Dog.create({
      id: nextId,  // Usar nextId como el ID para el nuevo perro
      name,
      min_height,
      max_height,
      min_weight,
      max_weight,
      life_span,
      image,
    });

    const dogTemperaments = await Temperament.findAll({
      where: {
        name: temperament,
      },
    });

    await createdDog.addTemperament(dogTemperaments);

    return res.status(201).json(createdDog);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createDog,
};

