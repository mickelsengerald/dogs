const axios = require('axios');
const { API_KEY } = process.env;

// Obtener el max ID de la API
async function getMaxApiDogId() {
  const response = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`);
  return Math.max(...response.data.map(dog => dog.id));
}

module.exports = {
  getMaxApiDogId,
};