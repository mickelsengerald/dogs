const { Temperament } = require('../db');

// Guardar los temperamentos
async function storeTemperamentsInDatabase(temperaments) {
    for (const temperament of temperaments) {
      await Temperament.findOrCreate({
        where: { name: temperament },
      });
    }
  }
  
async function getTemperamentsFromDatabase() {
  try {
    const temperaments = await Temperament.findAll({ order: [['name', 'ASC']] });
    return temperaments.map((t) => t.name);
  } catch (error) {
    throw new Error('Error al obtener los temperamentos de la base de datos');
  }
}
  
module.exports = {
  storeTemperamentsInDatabase,
  getTemperamentsFromDatabase,
};