import React from 'react';

const Card = ({ dog }) => {
  const { name, image, temperaments, weight } = dog;

  return (
    <div className="card">
      <img src={image} alt={name} className="card-image" />
      <div className="card-content">
        <h2 className="card-title">{name}</h2>
        <p className="card-text">
          <strong>Temperaments:</strong> {temperaments.join(', ')}
        </p>
        <p className="card-text">
          <strong>Weight:</strong> {weight.imperial} lbs ({weight.metric} kg)
        </p>
      </div>
    </div>
  );
};

export default Card;
