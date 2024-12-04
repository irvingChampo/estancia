import React from 'react';
import { Link } from 'react-router-dom';
import RegistrationForm from '../Moleculas/RegistrationForm';
import './RegistrationPage.css';

const RegistrationPage = () => {
  return (
    <div className="registration-container">
      <div className="registration-form-container">
        <h1>Registro</h1>
        <RegistrationForm />
        <p>
          ¿Ya tienes una cuenta? <Link to="/login">Inicia sesión aquí</Link>
        </p>
      </div>
      <img src="/img/2399.jpg" alt="Logo" className="registration-logo" />
    </div>
  );
};

export default RegistrationPage;
