const { Dog, Temperament } = require('../db');

const createDog = async (req, res, next) => {
  const { name, height, weight, life_span, image, temperament } = req.body;
  try {
    const createdDog = await Dog.create({
      name,
      height,
      weight,
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
