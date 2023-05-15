import React, { useState, useEffect } from 'react';
import DogCard from './DogCard';

const DogList = ({ dogs }) => {
  const [orderedDogs, setOrderedDogs] = useState([]);
  const [order, setOrder] = useState('');

  useEffect(() => {
    let orderedDogsCopy = [...dogs];

    switch (order) {
      case 'alph_asc':
        orderedDogsCopy.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'alph_desc':
        orderedDogsCopy.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'weight_asc':
        orderedDogsCopy.sort((a, b) => parseFloat(a.weight.metric) - parseFloat(b.weight.metric));
        break;
      case 'weight_desc':
        orderedDogsCopy.sort((a, b) => parseFloat(b.weight.metric) - parseFloat(a.weight.metric));
        break;
      case 'height_asc':
        orderedDogsCopy.sort((a, b) => parseFloat(a.height.metric) - parseFloat(b.height.metric));
        break;
      case 'height_desc':
        orderedDogsCopy.sort((a, b) => parseFloat(b.height.metric) - parseFloat(a.height.metric));
        break;
      case 'life_asc':
        orderedDogsCopy.sort((a, b) => parseFloat(a.life_span) - parseFloat(b.life_span));
        break;
      case 'life_desc':
        orderedDogsCopy.sort((a, b) => parseFloat(b.life_span) - parseFloat(a.life_span));
        break;
      default:
        break;
    }

    setOrderedDogs(orderedDogsCopy);
  }, [order, dogs]);

  const handleOrderChange = (e) => {
    setOrder(e.target.value);
  };

  const displayedDogs = order ? orderedDogs : dogs;

  return (
    <div>
      <select value={order} onChange={handleOrderChange}>
        <option value="">No filter</option>
        <option value="alph_asc">Alphabetical A-Z</option>
        <option value="alph_desc">Alphabetical Z-A</option>
        <option value="weight_asc">Weight Ascending</option>
        <option value="weight_desc">Weight Descending</option>
        <option value="height_asc">Height Ascending</option>
        <option value="height_desc">Height Descending</option>
        <option value="life_asc">Life Span Ascending</option>
        <option value="life_desc">Life Span Descending</option>
      </select>
      {displayedDogs.map((dog) => (
        <DogCard key={dog.id} dog={dog} />
      ))}
    </div>
  );
};

export default DogList;









       





  