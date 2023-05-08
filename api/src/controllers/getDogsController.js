const { Dog, Temperament } = require('../db');
const axios = require('axios');

async function getDogs(req, res, next) {
  try {
    // Hacer la llamada a la API para obtener todas las razas de perro
    const apiResponse = await axios.get('https://api.thedogapi.com/v1/breeds');
    const apiDogs = apiResponse.data;

    // Hacer la consulta a la base de datos para obtener todas las razas de perro guardadas
    const dbDogs = await Dog.findAll({
      include: Temperament,
      attributes: {
        exclude: ['createdAt', 'updatedAt']
      }
    });

    // Combinar las razas de perro de la API y de la base de datos
    const allDogs = [...apiDogs, ...dbDogs];

    // Devolver todas las razas de perro en la respuesta
    res.json(allDogs);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getDogs,
};
