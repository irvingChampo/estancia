import React, { useState } from 'react';
import Button from '../Atomos/Button';
import InputField from '../Atomos/InputField';
import SelectField from '../Atomos/SelectField';
import './RegistrationForm.css';

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    correo: '',
    matricula: '',
    contraseña: '',
    sexo: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Lógica para el envío de datos de registro
    console.log(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <InputField className="registration-input-field" type="text" placeholder="Nombre" value={formData.nombre} onChange={handleChange} name="nombre" />
      <InputField className="registration-input-field" type="text" placeholder="Apellido" value={formData.apellido} onChange={handleChange} name="apellido" />
      <InputField className="registration-input-field" type="email" placeholder="Correo" value={formData.correo} onChange={handleChange} name="correo" />
      <InputField className="registration-input-field" type="text" placeholder="Matrícula" value={formData.matricula} onChange={handleChange} name="matricula" />
      <InputField className="registration-input-field" type="password" placeholder="Contraseña" value={formData.contraseña} onChange={handleChange} name="contraseña" />
      <SelectField 
        className="registration-select-field"
        options={[
          { value: '', label: 'Selecciona tu sexo' },
          { value: 'masculino', label: 'Masculino' },
          { value: 'femenino', label: 'Femenino' }
        ]}
        value={formData.sexo} 
        onChange={handleChange} 
        name="sexo"
      />
      <Button className="registration-button" text="Registrar" />
    </form>
  );
};

export default RegistrationForm;
