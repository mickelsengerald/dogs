// controllers/index.js
const { getTemperaments } = require('./getTemperamentsController');
const { storeTemperamentsInDatabase } = require('./temperamentsController');

async function populateTemperaments() {
  const temperaments = await getTemperaments();
  await storeTemperamentsInDatabase(temperaments);
  console.log('Temperamentos almacenados en la base de datos');
}

module.exports = populateTemperaments;
