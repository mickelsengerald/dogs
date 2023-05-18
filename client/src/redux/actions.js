import axios from 'axios';

// Acciones de Dogs
export const GET_ALL_DOGS = 'GET_ALL_DOGS';
export const GET_DOG_BY_ID = 'GET_DOG_BY_ID';
export const SEARCH_DOGS_BY_NAME = 'SEARCH_DOGS_BY_NAME';
export const CREATE_DOG = 'CREATE_DOG';
export const GET_TEMPERAMENTS = 'GET_TEMPERAMENTS';
export const RESET_DOG_DETAIL= 'RESET_DOG_DETAIL'


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
      console.log("Fetched dog", data);
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
    console.log(`respuesta de data ${res.data}`)
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
    console.log('Temperaments:', res.data);
    dispatch({
      type: GET_TEMPERAMENTS,
      payload: res.data,
    });
  } catch (error) {
    console.error(error);
  }
};

export const resetDogDetail = () => {
  console.log("Resetting dog detail");
  return { type: RESET_DOG_DETAIL };
};




