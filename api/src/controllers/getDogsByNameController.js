const axios = require('axios');
const { Dog } = require('../db.js');
const { Op } = require('sequelize');
const { API_KEY } = process.env;

async function getDogsByName(req, res) {
  const { name } = req.params;

  if (!name) {
    return res.status(400).send('Name parameter is required');
  }

  try {
    // Buscar en la base de datos local
    const localDogs = await Dog.findAll({
      where: {
        name: {
          [Op.iLike]: `%${name}%`,
        },
      },
    });

    // Buscar en la API externa
    const response = await axios.get(`https://api.thedogapi.com/v1/breeds/search?q=${name}`, {
      headers: {
        'x-api-key': API_KEY
      }
    });
    const externalDogs = response.data.map((dog) => {
      return {
        id: dog.id,
        name: dog.name,
        temperaments: dog.temperament ? dog.temperament.split(", ") : [],
        // Agregar el resto de las propiedades que necesites
      };
    });

    const allDogs = localDogs.concat(externalDogs);

    if (allDogs.length === 0) {
      return res.status(404).send('No dogs found with that name');
    }

    res.status(200).send(allDogs);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error retrieving dogs by name');
  }
}

module.exports = {
  getDogsByName,
};



