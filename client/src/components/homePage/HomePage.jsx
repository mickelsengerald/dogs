import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { getAllDogs, searchDogsByName } from '../../redux/actions';
import DogList from '../dogCard/DogList';
import SearchBar from '../searchBar/SearchBar';
import Paginator from '../paginator/Paginator';

const itemsPerPage = 8;

const HomePage = () => {
  const dispatch = useDispatch();
  const { dogs, searchedDogs } = useSelector((state) => state);
  const [isSearching, setIsSearching] = useState(false); 
  const [currentPage, setCurrentPage] = useState(1); // Agrega el estado para la página actual

  useEffect(() => {
    dispatch(getAllDogs());
  }, [dispatch]);

  const handleSearch = (name) => {
    setIsSearching(true); 
    dispatch(searchDogsByName(name));
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Determina los perros que se deben mostrar en la página actual
  const dogsToDisplay = isSearching ? searchedDogs : dogs;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const selectedDogs = dogsToDisplay.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div>
      <SearchBar handleSearch={handleSearch} />
      <DogList dogs={selectedDogs} />
      <Paginator 
        totalItems={dogsToDisplay.length} 
        itemsPerPage={itemsPerPage} 
        onPageChange={handlePageChange}
      />
      <Link to="/form">
        <button>Create Dog</button>
      </Link>
    </div>
  );
};

export default HomePage;





