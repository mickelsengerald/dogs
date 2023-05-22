import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { getAllDogs, searchDogsByName, getTemperaments } from '../../redux/actions';
import DogList from '../dogCard/DogList';
import SearchBar from '../searchBar/SearchBar';
import Paginator from '../paginator/Paginator';
import './styleHomePage.css'

const itemsPerPage = 8;

const HomePage = () => {
  // Setear los estados de paginado, filtros, ordenamientos, etc
  const dispatch = useDispatch();
  const { dogs, searchedDogs } = useSelector((state) => state);
  const [isSearching, setIsSearching] = useState(false); 
  const [currentPage, setCurrentPage] = useState(1);
  const [order, setOrder] = useState('');
  const [orderedDogs, setOrderedDogs] = useState([]);
  const [selectedTemperaments, setSelectedTemperaments] = useState([]);

  // Useeffect para traer los temps y dogs
  useEffect(() => {
    dispatch(getAllDogs());
    dispatch(getTemperaments());
  }, [dispatch]);

  // Funcion para bsuacr por nombre
  const handleSearch = (name) => {
    setIsSearching(true); 
    dispatch(searchDogsByName(name));
  };

  // Maneja si se aplica algun ordenmaiento
  const handleOrderChange = (e) => {
    setOrder(e.target.value);
  };

  // Maneja si se aplica un temp
  const handleTemperamentChange = (temperament) => {
    setSelectedTemperaments(prevTemperaments => 
        prevTemperaments.includes(temperament) 
        ? prevTemperaments.filter(temp => temp !== temperament) 
        : [...prevTemperaments, temperament]
    );
  };

  const { temperaments } = useSelector((state) => state);

  // Como van cambiando los dogs a medida que voy aplicando filtro
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

  // Funcion para el paginado
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

 

  // Define que dogs mostarr en cada pagina
  const dogsToDisplay = isSearching ? searchedDogs : orderedDogs; 

  // Filtrado de los perros ya previamente ordenados pero por temps
  const filteredDogs = () => {
    return dogsToDisplay.filter((dog) => {
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
  
  const filteredDogsToDisplay = filteredDogs();
  
  // Setear los parametros para paginar
  const startIndex = (currentPage - 1) * itemsPerPage;
  const selectedDogs = filteredDogsToDisplay.slice(startIndex, startIndex + itemsPerPage);

  

  return (
    <div className='home-page'>
      <div className="top-container">
        <SearchBar handleSearch={handleSearch} />
        <Paginator 
        totalItems={dogsToDisplay.length} 
        itemsPerPage={itemsPerPage} 
        onPageChange={handlePageChange}
      />
      </div>

      <div className='main-container'>

        <div className="filters-container">
          <h4>Add a new breed:</h4>
          <Link to="/form">
            <button>Create Dog</button>
          </Link>
          <h4>Add a filter:</h4>
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
          <h4>Select temperaments:</h4>
        <div className="temperament-checkboxes">
      
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
        </div>
      </div>
      <div className='dogs-container'>
        <DogList dogs={selectedDogs} />
      </div>
      </div>
      

      
     </div>
  );
};

export default HomePage;






