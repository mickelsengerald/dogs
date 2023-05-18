import React from 'react';
import DogCard from './DogCard';

const DogList = ({ dogs }) => {
  return (
    <div>
      {dogs.map((dog) => (
        <DogCard key={dog.id} dog={dog} />
      ))}
    </div>
  );
};

export default DogList;










       





  