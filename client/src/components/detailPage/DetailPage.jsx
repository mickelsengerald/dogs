import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
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

  if (!dog) {
    return <div>Loading...</div>;
  }
  
  const { name, weight, height, life_span, image, temperament } = dog;
  
  if (!image || !name || !weight || !height || !life_span || !temperament) {
    return <div>Loading...</div>;
  }
  
  let tempArray;
  if (Array.isArray(temperament)) {
    tempArray = temperament;
  } else if (typeof temperament === 'string') {
    tempArray = temperament.split(', ');
  } else {
    tempArray = ['No se proporcionaron temperamentos.'];
  }

  return (
    <div>
      <h1>Detalle del perro: {name}</h1>
      <img src={image.url} alt={name} className="card-image" />
      <p>
        <strong>Peso:</strong> {weight.imperial} lbs ({weight.metric} kg)
      </p>
      <p>
        <strong>Altura:</strong> {height.imperial} in ({height.metric} cm)
      </p>
      <p>
        <strong>Vida promedio:</strong> {life_span}
      </p>
      <p className="card-text">
        <strong>Temperamentos:</strong> {tempArray.join(', ')}
      </p>
    </div>
  );
};

export default DetailPage;




