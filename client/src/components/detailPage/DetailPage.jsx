import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { getDogById, resetDogDetail } from '../../redux/actions';
import './styleDetailPage.css'

const DetailPage = () => {
  // Traer el id
  const { id } = useParams();
  const dispatch = useDispatch();

  // Cada vez que cambia el id se despacha la accion
  useEffect(() => {
    dispatch(getDogById(id));
    return () => {
      dispatch(resetDogDetail());
    };
  }, [id, dispatch]);

  // Traer el dog
  const dog = useSelector((state) => state.dogDetail);

  if (!dog) {
    return <div>Loading...</div>;
  }

  const { name, weight, height, life_span, image, temperament, min_weight, max_weight, min_height, max_height, temperaments } = dog;

  const displayWeight = `${weight?.metric || `${min_weight} - ${max_weight}`} kg`;
  const displayHeight = `${height?.metric || `${min_height} - ${max_height}`} cm`;

  // Traer los temnperamentos correspondientes, la diferencia de nombre es por los de la API y DB
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
  const imageUrl = image?.url || image || '';


  return (
    <div className="container">
      <div className="image-container">
        <img src={imageUrl} alt={name} className="card-image" />
      </div>

      <div className="content-container">
        <h1>Detail of breed: {name}</h1>
        <p className="p-content-container">
          <strong>Weight:</strong> {displayWeight}
        </p>
        <p className="p-content-container">
          <strong>Height:</strong> {displayHeight}
        </p>
        <p className="p-content-container">
          <strong>Life span:</strong> {life_span}
        </p>
        <p className="p-content-container">
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






