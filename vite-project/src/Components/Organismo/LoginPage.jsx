import React from 'react';
import { Link } from 'react-router-dom';
import LoginForm from '../Moleculas/LoginForm';
import './LoginPage.css';

const LoginPage = () => {
  return (
    <div className="login-page-body"> {/* Cambia "container" a "login-page-body" */}
      <div className="form-container">
        <div className="header-with-image">
          <img src="/img/result.png" alt="" className="header-icon" />
        </div>
        <LoginForm />
        <p>
          ¿No tienes una cuenta? <Link to="/register">Regístrate aquí</Link>
        </p>
      </div>
      <img src="/img/2399.jpg" alt="Logo" className="logo" />
    </div>
  );
};

export default LoginPage;
