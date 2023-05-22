const axios = require('axios');
const { DataTypes } = require('sequelize');
const {getMaxApiDogId} = require('../helpers/helpers')

let maxApiDogId = 0;

// Cuando inicias tu aplicación, obtén el 'id' más grande de los perros de la API
getMaxApiDogId()
  .then(id => {
    maxApiDogId = id;
  })
  .catch(error => {
    console.error('Error getting max dog id from API:', error);
  });


// Definir el modelo para la DB
module.exports = (sequelize) => {
  const Dog = sequelize.define('dog', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
      autoIncrementIdentity: true,
      defaultValue: () => maxApiDogId + 1
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    min_height: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    max_height: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    min_weight: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    max_weight: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    life_span: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
};
