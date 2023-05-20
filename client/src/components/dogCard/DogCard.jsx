import React from 'react';
import './styleDogCard.css'; 
import { Link } from 'react-router-dom';

const DogCard = ({ dog }) => {
  let { name, image, temperament, weight, height, life_span, min_height, max_height, min_weight, max_weight } = dog;

  let tempArray;
  if (Array.isArray(temperament)) {
    tempArray = temperament;
  } else if (typeof temperament === 'string') {
    tempArray = temperament.split(', ');
  } else {
    tempArray = ['No se proporcionaron temperamentos.'];
  }


  // Verificar si la altura y el peso son objetos, si no, tratarlos como cadenas
  let heightStr, weightStr;
  if (typeof height === 'object' && height !== null) {
    heightStr = `${height.imperial} in (${height.metric} cm)`;
  } else {
    heightStr = `${max_height} - ${min_height} cm` ;
  }

  if (typeof weight === 'object' && weight !== null) {
    weightStr = `${weight.imperial} lbs (${weight.metric} kg)`;
  } else {
    weightStr = `${max_weight} - ${min_weight} kg`;
  }

  // Verificar si la imagen es un objeto, si no, tratarla como una cadena
  let imgSrc;
  if (typeof image === 'object' && image !== null) {
    imgSrc = image.url;
  } else {
    imgSrc = image;
  }

  return (
    <div className="card">
      <img src={imgSrc} alt={name} className="card-image" />
      <div className="card-content">
        <Link to={`/detail/${dog.id}`}>
          <h2 className="card-title">{name}</h2>
        </Link>
        <p className="card-text">
          <strong>Temperaments:</strong> {tempArray.join(', ')}
        </p>
        <p className="card-text">
          <strong>Weight:</strong> {weightStr}
          {/* <br />
          <strong>Altura:</strong> {heightStr}
          <br />
          <strong>Vida promedio:</strong> {life_span} */}
        </p>
      </div>
    </div>
  );
};

export default DogCard;



