import axios from 'axios';

// Acciones de Dogs
export const GET_ALL_DOGS = 'GET_ALL_DOGS';
export const GET_DOG_BY_ID = 'GET_DOG_BY_ID';
export const SEARCH_DOGS_BY_NAME = 'SEARCH_DOGS_BY_NAME';
export const CREATE_DOG = 'CREATE_DOG';
export const GET_TEMPERAMENTS = 'GET_TEMPERAMENTS';
export const RESET_DOG_DETAIL= 'RESET_DOG_DETAIL'
export const SEARCH_DOGS_ERROR = 'SEARCH_DOGS_ERROR'


export const getAllDogs = () => async (dispatch) => {
  try {
    const res = await axios.get('http://localhost:3001/dogs');
    dispatch({
      type: GET_ALL_DOGS,
      payload: res.data,
    });
  } catch (error) {
    console.error(error);
  }
};

export const getDogById = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`http://localhost:3001/dogs/${id}`);
      return dispatch({ type: GET_DOG_BY_ID, payload: data });
    } catch (error) {
      console.error(error);
    }
  };
};



export const searchDogsByName = (name) => async (dispatch) => {
  try {
    const res = await axios.get(`http://localhost:3001/dogs/search/${name}`);
    dispatch({
      type: SEARCH_DOGS_BY_NAME,
      payload: res.data,
    });
  } catch (error) {
    console.error(error);
  }
};

export const createDog = (newDog) => async (dispatch) => {
  try {
    console.log(`new dog ${JSON.stringify(newDog, null, 2)}`)
    const res = await axios.post('http://localhost:3001/dogs', newDog);
    dispatch({
      type: CREATE_DOG,
      payload: res.data,
    });
  } catch (error) {
    console.error(error);
  }
};

export const getTemperaments = () => async (dispatch) => {
  try {
    const res = await axios.get('http://localhost:3001/temperaments');
    dispatch({
      type: GET_TEMPERAMENTS,
      payload: res.data,
    });
  } catch (error) {
    console.error(error);
  }
};

export const resetDogDetail = () => {
  return { type: RESET_DOG_DETAIL };
};




