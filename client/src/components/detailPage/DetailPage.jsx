import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { getDogById, resetDogDetail } from '../../redux/actions';

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
    <div>
      <h1>Detalle del perro: {name}</h1>
      <img src={imageUrl} alt={name} className="card-image" />
      <p>
        <strong>Peso:</strong> {displayWeight}
      </p>
      <p>
        <strong>Altura:</strong> {displayHeight}
      </p>
      <p>
        <strong>Vida promedio:</strong> {life_span}
      </p>
      <p className="card-text">
        <strong>Temperamentos:</strong> {tempArray.join(', ')}
      </p>
      <Link to="/home">Volver</Link>
    </div>
  );
};

export default DetailPage;






