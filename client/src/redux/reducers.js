import { combineReducers } from 'redux';
import {
  GET_ALL_DOGS,
  GET_DOG_BY_ID,
  SEARCH_DOGS_BY_NAME,
  CREATE_DOG,
  GET_TEMPERAMENTS,
  RESET_DOG_DETAIL
} from './actions';

// Estado inicial
const initialState = {
  dogs: [],
  dogDetail: {},
  searchedDogs: [],
  temperaments: [],
};

// Funciones reductoras
const dogsReducer = (state = initialState.dogs, action) => {
  switch (action.type) {
    case GET_ALL_DOGS:
      return action.payload;
    case CREATE_DOG:
      return [...state, action.payload];
    default:
      return state;
  }
};

const dogDetailReducer = (state = initialState.dogDetail, action) => {
  switch (action.type) {
    case GET_DOG_BY_ID:
      return action.payload;
    case RESET_DOG_DETAIL:
      return initialState.dogDetail;
    default:
      return state;
  }
};



const searchedDogsReducer = (state = initialState.searchedDogs, action) => {
  switch (action.type) {
    case SEARCH_DOGS_BY_NAME:
      return action.payload;
    default:
      return state;
  }
};

const temperamentsReducer = (state = initialState.temperaments, action) => {
  switch (action.type) {
    case GET_TEMPERAMENTS:
      return action.payload;
    default:
      return state;
  }
};



// Combinar todas las funciones reductoras
const rootReducer = combineReducers({
  dogs: dogsReducer,
  dogDetail: dogDetailReducer,
  searchedDogs: searchedDogsReducer,
  temperaments: temperamentsReducer,
});

export default rootReducer;
