const { Dog, Temperament } = require('../db');

const getDogById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const dog = await Dog.findByPk(id, {
      include: {
        model: Temperament,
        attributes: ['name'],
        through: {
          attributes: []
        }
      },
      attributes: {
        exclude: ['createdAt', 'updatedAt']
      }
    });

    if (!dog) {
      return res.status(404).json({ message: 'Dog breed not found' });
    }

    return res.status(200).json(dog);
  } catch (error) {
    next(error);
  }
};

module.exports = { getDogById };