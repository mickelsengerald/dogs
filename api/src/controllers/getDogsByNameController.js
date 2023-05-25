const axios = require('axios');
const { Dog, Temperament } = require('../db.js');
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
      include: {
        model: Temperament,
        attributes: ['name'], 
        through: { attributes: [] }, 
      }
    });

    // Obtener todas las razas de la API externa
    const response = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`);

    // Filtrar las razas que coinciden con la búsqueda
    const externalDogs = response.data
      .filter(dog => dog.name.toLowerCase().includes(name.toLowerCase()))
      .map(dog => ({
        id: dog.id,
        name: dog.name,
        temperament: dog.temperament ? dog.temperament.split(", ") : [],
        image: dog.image ? { url: dog.image.url } : { url: null },
        weight: dog.weight,
        height: dog.height,
        life_span: dog.life_span
      }));

    // Juntar los dogs que cumplan de la API y DB
    const allDogs = localDogs.concat(externalDogs);
    

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





