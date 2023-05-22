require('dotenv').config();
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
const {
  DB_USER, DB_PASSWORD, DB_HOST,
} = process.env;

// Iniciar la DB
const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:5432/dogs`, {
  logging: false, 
  native: false, 
});

const modelDefiners = [];

// Leer los modleos para la DB
fs.readdirSync(path.join(__dirname, 'models'))
  .filter((file) => file.endsWith('.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, 'models', file)));
  });

// Generar la conexión
modelDefiners.forEach(model => {
  if (typeof model === 'function') {
    model(sequelize)
  }
});

// Nombres en mayus
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

// Relaciones
const { Dog, Temperament } = sequelize.models;

// Muchos a muchos
Dog.belongsToMany(Temperament, { through: 'dog_temperament' });
Temperament.belongsToMany(Dog, { through: 'dog_temperament' });

module.exports = {
  ...sequelize.models,
  conn: sequelize,
};

