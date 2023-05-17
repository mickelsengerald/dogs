import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllDogs, searchDogsByName } from '../../redux/actions';
import DogList from '../dogCard/DogList';
import SearchBar from '../searchBar/SearchBar';

const HomePage = () => {
  const dispatch = useDispatch();
  const { dogs, searchedDogs } = useSelector((state) => state);
  const [isSearching, setIsSearching] = useState(false); 

  useEffect(() => {
    dispatch(getAllDogs());
  }, [dispatch]);

  const handleSearch = (name) => {
    setIsSearching(true); 
    dispatch(searchDogsByName(name));
  };

  console.log(searchedDogs);

  return (
    <div>
      <SearchBar handleSearch={handleSearch} />
      <DogList dogs={isSearching ? searchedDogs : dogs} />
    </div>
  );
};

export default HomePage;




