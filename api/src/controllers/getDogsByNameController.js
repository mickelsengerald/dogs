const { Op } = require('sequelize');
const { Dog, Temperament } = require('../db');

const getDogsByName = async (req, res, next) => {
  try {
    const { name } = req.query;
    if (!name) {
      return res.status(400).send('Name parameter is required');
    }
    const dogs = await Dog.findAll({
      include: Temperament,
      where: {
        name: {
          [Op.iLike]: `%${name}%` // Case-insensitive search
        }
      },
      attributes: {
        exclude: ['createdAt', 'updatedAt']
      }
    });
    if (!dogs.length) {
      return res.status(404).send(`No dog breed matches the name: ${name}`);
    }
    return res.json(dogs);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getDogsByName,
};
