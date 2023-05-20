import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { getDogById, resetDogDetail } from '../../redux/actions';
import './styleDetailPage.css'

const DetailPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("Effect: Fetching dog", id);
    dispatch(getDogById(id));
    return () => {
      console.log("Cleaning up: Resetting dog detail");
      dispatch(resetDogDetail());
    };
  }, [id, dispatch]);

  const dog = useSelector((state) => state.dogDetail);
  console.log('este es el dog de db', dog);

  if (!dog) {
    return <div>Loading...</div>;
  }

  const { name, weight, height, life_span, image, temperament, min_weight, max_weight, min_height, max_height, temperaments } = dog;

  const displayWeight = `${weight?.metric || `${min_weight} - ${max_weight}`} kg`;
  const displayHeight = `${height?.metric || `${min_height} - ${max_height}`} cm`;


  let tempArray;
  if (Array.isArray(temperament)) {
    tempArray = temperament;
  } else if (typeof temperament === 'string') {
    tempArray = temperament.split(', ');
  } else if (Array.isArray(temperaments)){
    tempArray = temperaments.map((temperament) => temperament.name)
  } else {
    tempArray = ['No se proporcionaron temperamentos.'];
  }
  console.log('este es el temp array ', tempArray);
  const imageUrl = image?.url || image || '';


  return (
    <div className="container">
  <div className="image-container">
    <img src={imageUrl} alt={name} className="card-image" />
  </div>

  <div className="content-container">
    <h1>Detail of breed: {name}</h1>
    <p>
      <strong>Weight:</strong> {displayWeight}
    </p>
    <p>
      <strong>Height:</strong> {displayHeight}
    </p>
    <p>
      <strong>Life span:</strong> {life_span}
    </p>
    <p className="card-text">
      <strong>Temperaments:</strong> {tempArray.join(", ")}
    </p>
    <Link to="/home" className="link">
      Return
    </Link>
  </div>
</div>

  );
};

export default DetailPage;






