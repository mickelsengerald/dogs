import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllDogs, searchDogsByName } from '../../redux/actions';
import DogCard from '../dogCard/DogCard';
import SearchBar from '../searchBar/SearchBar';

const HomePage = () => {
  const dispatch = useDispatch();
  const { dogs } = useSelector((state) => state);

  useEffect(() => {
    dispatch(getAllDogs());
  }, [dispatch]);

  const handleSearch = (name) => {
    dispatch(searchDogsByName(name));
  };

  return (
    <div>
      <SearchBar handleSearch={handleSearch} />
      <div>
        {dogs.map((dog) => (
          <DogCard key={dog.id} dog={dog} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
