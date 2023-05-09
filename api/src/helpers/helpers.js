const axios = require('axios');

async function getMaxApiDogId() {
  const response = await axios.get('https://api.thedogapi.com/v1/breeds');
  return Math.max(...response.data.map(dog => dog.id));
}

module.exports = {
  getMaxApiDogId,
};