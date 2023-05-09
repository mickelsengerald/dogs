const axios = require('axios');
const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
let maxApiDogId = 0;

// Cuando inicias tu aplicación, obtén el 'id' más grande de los perros de la API
axios.get('https://api.thedogapi.com/v1/breeds')
  .then(response => {
    maxApiDogId = Math.max(...response.data.map(dog => dog.id));
  })
  .catch(error => {
    console.error('Error getting max dog id from API:', error);
  });


module.exports = (sequelize) => {
  // defino el modelo
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
