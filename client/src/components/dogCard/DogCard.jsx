import React from 'react';
import './DogCard.css'; // Asegúrate de tener este archivo en la misma carpeta
import { Link } from 'react-router-dom';

const DogCard = ({ dog }) => {
  const { name, image, temperament, weight, height, life_span } = dog;
  

  let tempArray;
if (Array.isArray(temperament)) {
  tempArray = temperament;
} else if (typeof temperament === 'string') {
  tempArray = temperament.split(', ');
} else {
  tempArray = ['No se proporcionaron temperamentos.'];
}


  return (
    <div className="card">
      <img src={image.url} alt={name} className="card-image" /> {/* Aquí es donde se hizo el cambio */}
      <div className="card-content">
        <Link to={`/detail/${dog.id}`}>
          <h2 className="card-title">{name}</h2>
        </Link>
        <p className="card-text">
          <strong>Temperamentos:</strong> {tempArray.join(', ')}
        </p>
        <p className="card-text">
          <strong>Peso:</strong> {weight.imperial} lbs ({weight.metric} kg)
          <br></br>
          <strong>Altura:</strong> {height.imperial} in ({height.metric} cm)
          <br></br>
          <strong>Vida promedio:</strong> {life_span}
        </p>
      </div>
    </div>
  );
};

export default DogCard;


