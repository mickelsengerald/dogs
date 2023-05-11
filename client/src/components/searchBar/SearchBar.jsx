import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { searchDogsByName } from '../../redux/actions';

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(searchDogsByName(searchQuery));
    setSearchQuery('');
  };

  return (
    <form onSubmit={handleSearch}>
      <input
        type="text"
        placeholder="Buscar por nombre"
        value={searchQuery}
        onChange={handleInputChange}
      />
      <button type="submit">Buscar</button>
    </form>
  );
};

export default SearchBar;
