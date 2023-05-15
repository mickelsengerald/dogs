import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllDogs, searchDogsByName } from '../../redux/actions';
import DogList from '../dogCard/DogList';
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
  console.log(dogs);

  return (
    
    <div>
      <SearchBar handleSearch={handleSearch} />
      <div>
      
      <DogList dogs={dogs} />
      </div>
    </div>
  );
};

export default HomePage;
