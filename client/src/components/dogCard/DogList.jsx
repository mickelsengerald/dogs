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
          orderedDogsCopy.sort((a, b) => {
            const weightA = a.weight?.metric || (a.min_weight + a.max_weight) / 2 || 0;
            const weightB = b.weight?.metric || (b.min_weight + b.max_weight) / 2 || 0;
            return parseFloat(weightA) - parseFloat(weightB);
          });
          break;
        case 'weight_desc':
          orderedDogsCopy.sort((a, b) => {
            const weightA = a.weight?.metric || (a.min_weight + a.max_weight) / 2 || 0;
            const weightB = b.weight?.metric || (b.min_weight + b.max_weight) / 2 || 0;
            return parseFloat(weightB) - parseFloat(weightA);
          });
          break;
        case 'height_asc':
          orderedDogsCopy.sort((a, b) => {
            const heightA = a.height?.metric || (a.min_height + a.max_height) / 2 || 0;
            const heightB = b.height?.metric || (b.min_height + b.max_height) / 2 || 0;
            return parseFloat(heightA) - parseFloat(heightB);
          });
          break;
        case 'height_desc':
          orderedDogsCopy.sort((a, b) => {
            const heightA = a.height?.metric || (a.min_height + a.max_height) / 2 || 0;
            const heightB = b.height?.metric || (b.min_height + b.max_height) / 2 || 0;
            return parseFloat(heightB) - parseFloat(heightA);
          });
          break;
      case 'life_asc':
        orderedDogsCopy.sort((a, b) => {
          const lifeSpanA = parseFloat(a.life_span) || 0;
          const lifeSpanB = parseFloat(b.life_span) || 0;
          return lifeSpanA - lifeSpanB;
        });
        break;
      case 'life_desc':
        orderedDogsCopy.sort((a, b) => {
          const lifeSpanA = parseFloat(a.life_span) || 0;
          const lifeSpanB = parseFloat(b.life_span) || 0;
          return lifeSpanB - lifeSpanA;
        });
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









       





  