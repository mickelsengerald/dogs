import axios from 'axios';

// Acciones de Dogs
export const GET_ALL_DOGS = 'GET_ALL_DOGS';
export const GET_DOG_BY_ID = 'GET_DOG_BY_ID';
export const SEARCH_DOGS_BY_NAME = 'SEARCH_DOGS_BY_NAME';
export const CREATE_DOG = 'CREATE_DOG';
export const GET_TEMPERAMENTS = 'GET_TEMPERAMENTS';

export const getAllDogs = () => async (dispatch) => {
  try {
    const res = await axios.get('/dogs');
    dispatch({
      type: GET_ALL_DOGS,
      payload: res.data,
    });
  } catch (error) {
    console.error(error);
  }
};

export const getDogById = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/dogs/${id}`);
    dispatch({
      type: GET_DOG_BY_ID,
      payload: res.data,
    });
  } catch (error) {
    console.error(error);
  }
};

export const searchDogsByName = (name) => async (dispatch) => {
  try {
    const res = await axios.get(`/dogs/search/${name}`);
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
    const res = await axios.post('/dogs', newDog);
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
    const res = await axios.get('/temperaments');
    dispatch({
      type: GET_TEMPERAMENTS,
      payload: res.data,
    });
  } catch (error) {
    console.error(error);
  }
};
