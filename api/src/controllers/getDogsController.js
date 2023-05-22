const { Dog, Temperament } = require('../db');
const axios = require('axios');
const { API_KEY } = process.env;

async function getDogs(req, res, next) {
  try {
    // Hacer la llamada a la API para obtener todas las razas de perro
    const apiResponse = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`);
    const apiDogs = apiResponse.data;

    // Hacer la consulta a la base de datos para obtener todas las razas de perro guardadas
    const dbDogsData = await Dog.findAll({
      include: {
        model: Temperament,
        attributes: ['name'], 
        through: { attributes: [] }, 
      }
    });

    // Convertir los datos de la base de datos a un formato manejable
    const dbDogs = dbDogsData.map(dog => {
      const { id, name, min_height, max_height, min_weight, max_weight, life_span, image, temperaments } = dog.get();

      // Transformar la lista de temperamentos en una lista de strings
      const temperamentNames = temperaments.map(temp => temp.name);

      // Retorna la estructura correcta del objeto
      return {
        id,
        name,
        min_height,
        max_height,
        min_weight,
        max_weight,
        life_span,
        image,
        temperament: temperamentNames,
      };
    });

    // Combinar las razas de perro de la API y de la base de datos
    const allDogs = [...apiDogs, ...dbDogs];

    // Devolver todas las razas de perro en la respuesta
    res.json(allDogs);
  } 
  
  catch (error) {
    next(error);
  }
}

module.exports = {
  getDogs,
};
