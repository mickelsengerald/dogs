const axios = require('axios');
const { Dog } = require('../db.js');
const { Op } = require('sequelize');
const { API_KEY } = process.env;

async function getDogsByName(req, res) {
  // Verificar que llegó el name
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

    const externalDogs = response.data.map(async (dog) => {
      // Obtener la imagen correspondiente utilizando el id del perro
      const imageResponse = await axios.get(`https://api.thedogapi.com/v1/images/search?breed_id=${dog.id}`, {
        headers: {
          'x-api-key': API_KEY
        }
      });
      
      const image = imageResponse.data[0]?.url;
      
      // Retornar el dog
      return {
        id: dog.id,
        name: dog.name,
        temperament: dog.temperament ? dog.temperament.split(", ") : [],
        image: image ? { url: image } : { url: null },
        weight: dog.weight,
        height: dog.height,
        life_span: dog.life_span
      };
    });

    // Esperar a que se completen todas las promesas
    const externalDogsData = await Promise.all(externalDogs);
    
    // Juntar los dogs que cumplan de la API y DB
    const allDogs = localDogs.concat(externalDogsData);
    

    if (allDogs.length === 0) {
      return res.status(404).send('No dogs found with that name');
    }

    res.status(200).send(allDogs);
  } 
  
  catch (error) {
    console.error(error);
    res.status(500).send('Error retrieving dogs by name');
  }
}

module.exports = {
  getDogsByName,
};




