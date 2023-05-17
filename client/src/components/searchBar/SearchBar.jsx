import React, { useState } from 'react';
import { useDispatch } from 'react-redux';


const SearchBar = ({ handleSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');
 

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    handleSearch(searchQuery);
    setSearchQuery('');
  };

  const handleSearchAllDogs = () => {
    window.location.reload(); // Recargar la página
  };

  return (
    <div>
      <form onSubmit={handleSearchSubmit}>
        <input
          type="text"
          placeholder="Buscar por nombre"
          value={searchQuery}
          onChange={handleInputChange}
        />
        <button type="submit">Buscar</button>
      </form>
      <button onClick={handleSearchAllDogs}>Todos</button>
    </div>
  );
};

export default SearchBar;

