import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createDog, getTemperaments } from '../../redux/actions';

const FormPage = () => {
  const dispatch = useDispatch();
  const { temperaments } = useSelector((state) => state);

  const [formData, setFormData] = useState({
    name: '',
    image: '',
    heightMin: '',
    heightMax: '',
    weightMin: '',
    weightMax: '',
    life_span: '',
    temperament: [],
  });

  useEffect(() => {
    dispatch(getTemperaments());
  }, [dispatch]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckboxChange = (e) => {
    const temperament = e.target.value;
    const checked = e.target.checked;

    if (checked) {
      setFormData({ ...formData, temperament: [...formData.temperament, temperament] });
    } else {
      setFormData({
        ...formData,
        temperament: formData.temperament.filter((t) => t !== temperament),
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createDog(formData));
    // Lógica adicional después de crear la raza de perro, como redireccionar a la página de detalles, etc.
  };

  return (
    <div>
      <h2>Crear Nueva Raza de Perro</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Nombre:</label>
          <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} />
        </div>
        <div>
          <label htmlFor="image">Link de la Imagen:</label>
          <input type="text" id="image" name="image" value={formData.image} onChange={handleInputChange} />
        </div>
        <div>
          <label htmlFor="heightMin">Altura Mínima:</label>
          <input type="text" id="heightMin" name="heightMin" value={formData.heightMin} onChange={handleInputChange} />
        </div>
        <div>
          <label htmlFor="heightMax">Altura Máxima:</label>
          <input type="text" id="heightMax" name="heightMax" value={formData.heightMax} onChange={handleInputChange} />
        </div>
        <div>
          <label htmlFor="weightMin">Peso Mínimo:</label>
          <input type="text" id="weightMin" name="weightMin" value={formData.weightMin} onChange={handleInputChange} />
        </div>
        <div>
          <label htmlFor="weightMax">Peso Máximo:</label>
          <input type="text" id="weightMax" name="weightMax" value={formData.weightMax} onChange={handleInputChange} />
        </div>
        <div>
          <label htmlFor="life_span">Años de Vida:</label>
          <input
            type="text"
            id="life_span"
            name="life_span"
            value={formData.life_span}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Temperamentos:</label>
          <select
            multiple
            id="temperament"
            name="temperament"
            value={formData.temperamentos}
            onChange={handleInputChange}
            >
                {temperaments.map((temperament) => (
                <option key={temperament.id} value={temperament.name}>
                    {temperament.name}
                </option>
                ))}
            </select>
        </div>
            <button type="submit">Crear</button>
        </form>
    </div>
            );
            };
            
            export default FormPage;

