import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { getAllDogs, searchDogsByName, getTemperaments } from '../../redux/actions';
import DogList from '../dogCard/DogList';
import SearchBar from '../searchBar/SearchBar';
import Paginator from '../paginator/Paginator';

const itemsPerPage = 8;

const HomePage = () => {
  const dispatch = useDispatch();
  const { dogs, searchedDogs } = useSelector((state) => state);
  const [isSearching, setIsSearching] = useState(false); 
  const [currentPage, setCurrentPage] = useState(1);
  const [order, setOrder] = useState('');
  const [orderedDogs, setOrderedDogs] = useState([]);
  const [selectedTemperaments, setSelectedTemperaments] = useState([]);


  useEffect(() => {
    dispatch(getAllDogs());
    dispatch(getTemperaments());
  }, [dispatch]);

  const handleSearch = (name) => {
    setIsSearching(true); 
    dispatch(searchDogsByName(name));
  };

  const handleOrderChange = (e) => {
    setOrder(e.target.value);
  };

  const handleTemperamentChange = (temperament) => {
    setSelectedTemperaments(prevTemperaments => 
        prevTemperaments.includes(temperament) 
        ? prevTemperaments.filter(temp => temp !== temperament) 
        : [...prevTemperaments, temperament]
    );
  };

  const { temperaments } = useSelector((state) => state);

  useEffect(() => {
    // Copia el código de ordenación de DogList aquí
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

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const dogsToDisplay = isSearching ? searchedDogs : orderedDogs; // Usa orderedDogs en lugar de dogs

  
  const filteredDogs = () => {
    return orderedDogs.filter((dog) => {
      if (selectedTemperaments.length === 0) {
        return true;
      }
  
      let dogTemperaments = [];
      if (Array.isArray(dog.temperament)) {
        dogTemperaments = dog.temperament;
      } else if (typeof dog.temperament === 'string') {
        dogTemperaments = dog.temperament.split(', ');
      }
      return selectedTemperaments.some((temperament) =>
        dogTemperaments.includes(temperament)
      );
    });
  };
  
  const filteredsDogs = filteredDogs();
  // Determina los perros que se deben mostrar en la página actual
  
  const startIndex = (currentPage - 1) * itemsPerPage;
  const selectedDogs = filteredsDogs.slice(startIndex, startIndex + itemsPerPage);
  

  return (
    <div>
      <SearchBar handleSearch={handleSearch} />

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
      {temperaments.map((temperament) => (
    <div key={temperament}>
        <input 
            type="checkbox" 
            id={temperament} 
            value={temperament} 
            checked={selectedTemperaments.includes(temperament)} 
            onChange={() => handleTemperamentChange(temperament)}
        />
        <label htmlFor={temperament}>{temperament}</label>
    </div>
))}

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






