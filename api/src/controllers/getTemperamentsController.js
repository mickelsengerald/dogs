const axios = require('axios');
const { API_KEY } = process.env;

async function getTemperaments() {
  try {
    const response = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`);
    
    // Traer todos los tempermanetos y filtrarlos
    const allTemperaments = response.data.reduce((temperaments, breed) => {
      if (breed.temperament) {
        const breedTemperaments = breed.temperament.split(',').map(t => t.trim());
        return [...temperaments, ...breedTemperaments];
      }
      return temperaments;
    }, []);

    // Enviar los temperamentos unicos filtrados
    const uniqueTemperaments = [...new Set(allTemperaments)];
    
    return uniqueTemperaments.sort();
  } 
  
  catch (error) {
    console.error('Error al obtener los temperamentos:', error);
    return [];
  }
}

module.exports = {
  getTemperaments
};

