import React from 'react';
import DogCard from './DogCard';
import './styleDogCard.css'; 

const DogList = ({ dogs }) => {
  return (
    <div className='all-cards-container'>
      {dogs.map((dog) => (
        <DogCard key={dog.id} dog={dog} />
      ))}
    </div>
  );
};

export default DogList;










       





  