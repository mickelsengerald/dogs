import React, { useState } from 'react';


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
          placeholder="Search by name"
          value={searchQuery}
          onChange={handleInputChange}
        />
        <button type="submit" disabled={!searchQuery}>Search</button>
      </form>
      <button onClick={handleSearchAllDogs}>All Dogs</button>
    </div>
  );
};

export default SearchBar;


