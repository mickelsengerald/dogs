import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { createDog, getTemperaments } from '../../redux/actions';
import './styleFormPage.css'

const FormPage = () => {
  const dispatch = useDispatch();
  const temperaments = useSelector((state) => state.temperaments);

  const [formData, setFormData] = useState({
    name: '',
    image: '',
    min_height: '',
    max_height: '',
    min_weight: '',
    max_weight: '',
    life_span: '',
    temperament: [],
  });

  const [selectedTemperaments, setSelectedTemperaments] = useState([]);

  // Estado para los mensajes de error
  const [errors, setErrors] = useState({});

  useEffect(() => {
    dispatch(getTemperaments());
  }, [dispatch]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });

    // Validación en tiempo real
    switch(e.target.name) {
      case 'name':
        if(!/^[\w\s]+$/.test(e.target.value)) {
          setErrors({ ...errors, [e.target.name]: "Name must be a string" });
        } else {
          setErrors({ ...errors, [e.target.name]: "" });
        }
        break;
        case 'image':
          if (!e.target.value.startsWith('http://') && !e.target.value.startsWith('https://')) {
            setErrors({ ...errors, [e.target.name]: "Must be a valid URL" });
          } else {
            setErrors({ ...errors, [e.target.name]: "" });
          }
          break;
        
        
      case 'min_height':
      case 'max_height':
      case 'min_weight':
      case 'max_weight':
        if(!/^\d+$/.test(e.target.value)) {
          setErrors({ ...errors, [e.target.name]: "Height and weight must be numbers" });
        } else {
          setErrors({ ...errors, [e.target.name]: "" });
        }
        break;
      case 'life_span':
        if(!/^\d+\syears$/.test(e.target.value)) {
          setErrors({ ...errors, life_span: "Life span must be a number followed by 'years'" });
        } else {
          setErrors({ ...errors, life_span: "" });
        }
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    dispatch(getTemperaments());
  }, [dispatch]);

  

  const handleSelectChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
    setSelectedTemperaments(selectedOptions);
    if (selectedOptions.length === 0) {
      setErrors({ ...errors, temperament: "At least one temperament is required." });
    } else {
      setErrors({ ...errors, temperament: "" });
    }
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    const finalData = { ...formData, temperament: selectedTemperaments };
    dispatch(createDog(finalData));
    
    // Limpieza de los campos
    setFormData({
      name: '',
      image: '',
      min_height: '',
      max_height: '',
      min_weight: '',
      max_weight: '',
      life_span: '',
      temperament: [],
    });
    setSelectedTemperaments([]);
  };
  
  

  return (
    <div className='container'>
      <h2>Create New Breed of Dog</h2>
      <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} />
        {errors.name && <p>{errors.name}</p>}
      </div>
      <div>
        <label htmlFor="image">Image:</label>
        <input type="text" id="image" name="image" value={formData.image} onChange={handleInputChange} />
        {errors.image && <p>{errors.image}</p>}
      </div>
      <div>
        <label htmlFor="min_height">Min Height (cm):</label>
        <input type="text" id="min_height" name="min_height" value={formData.min_height} onChange={handleInputChange} />
        {errors.min_height && <p>{errors.min_height}</p>}
      </div>
      <div>
        <label htmlFor="max_height">Max Height (cm):</label>
        <input type="text" id="max_height" name="max_height" value={formData.max_height} onChange={handleInputChange} />
        {errors.max_height && <p>{errors.max_height}</p>}
      </div>
      <div>
        <label htmlFor="min_weight">Min Weight (kg):</label>
        <input type="text" id="min_weight" name="min_weight" value={formData.min_weight} onChange={handleInputChange} />
        {errors.min_weight && <p>{errors.min_weight}</p>}
      </div>
      <div>
        <label htmlFor="max_weight">Max Weight (kg):</label>
        <input type="text" id="max_weight" name="max_weight" value={formData.max_weight} onChange={handleInputChange} />
        {errors.max_weight && <p>{errors.max_weight}</p>}
      </div>
      <div>
        <label htmlFor="life_span">Life Span:</label>
        <input type="text" id="life_span" name="life_span" value={formData.life_span} onChange={handleInputChange} />
        {errors.life_span && <p>{errors.life_span}</p>}
      </div>
      <div>
        <label>Select Temperaments:</label>
        <select multiple id="temperament" name="temperament" onChange={handleSelectChange}>
          {temperaments.map((temperament, index) => (
            <option key={index} value={temperament}>
              {temperament}
            </option>
          ))}
        </select>
        {errors.temperament && <p>{errors.temperament}</p>}
      </div>

      <div className='temperaments-container'>
        <h3>Your Temperaments:</h3>
        {selectedTemperaments.map((temperament, index) => (
          <span key={index}>{temperament} &nbsp;</span>
        ))}
      </div>
      <button type="submit" disabled={Object.values(errors).some(error => error !== "") || Object.values(formData).some(value => value === "")}>Submit</button>

    </form>
    <Link to="/home">
      <button>Home</button>
    </Link>
  </div>
);
};

export default FormPage;





