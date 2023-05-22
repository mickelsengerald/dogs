const { Dog, Temperament } = require('../db');
const axios = require('axios');
const { API_KEY } = process.env;

async function getDogById(req, res, next) {
  try {
    const id = parseInt(req.params.id);

    // Obtener la lista completa de razas de perros de la API
    const apiResponse = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`);
    const apiDogs = apiResponse.data;

    // Buscar la raza de perro con el ID especificado en la lista de razas de perros de la API
    const apiDog = apiDogs.find(dog => dog.id === id);

    // Hacer la consulta a la base de datos para obtener el perro con el id especificado
    const dbDog = await Dog.findByPk(id, {
      include: Temperament,
      attributes: {
        exclude: ['createdAt', 'updatedAt']
      }
    });

    // Combinar el perro de la API y el de la base de datos
    let dog;
    if (apiDog) {
      dog = { ...apiDog, ...dbDog?.dataValues };
    } else {
      dog = dbDog;
    }

    // Devolver el perro en la respuesta
    if (!dog) {
      return res.status(404).json({ message: 'Dog breed not found' });
    }

    return res.json(dog);

  } 
  catch (error) {
    next(error);
  }
}

module.exports = {
  getDogById,
};





