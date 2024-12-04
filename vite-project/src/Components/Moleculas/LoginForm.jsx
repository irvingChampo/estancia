import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginForm.css';


const LoginForm = () => {
  const [userType, setUserType] = useState('alumno');
  const [credentials, setCredentials] = useState({
    matricula: '',
    cct: '',
    password: ''
  });

  const navigate = useNavigate();

  const handleUserTypeChange = (e) => {
    setUserType(e.target.value);
    setCredentials({
      matricula: '',
      cct: '',
      password: ''
    });
  };

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (userType === 'alumno') {
      // Redirigir a la vista del alumno
      navigate('/alumno');
    } else if (userType === 'maestro') {
      // Redirigir a la vista del maestro
      navigate('/maestro');
    } else if (userType === 'administrativo') {
      // Redirigir a la vista del administrativo
      navigate('/administrativo');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <select id="userType" value={userType} onChange={handleUserTypeChange} className="select-field">
          <option value="alumno">Alumno</option>
          <option value="maestro">Maestro</option>
          <option value="administrativo">Administrativo</option> {/* Opción agregada */}
        </select>
      </div>

      {userType === 'alumno' ? (
        <div>
          <input
            type="text"
            name="matricula"
            value={credentials.matricula}
            onChange={handleChange}
            placeholder="Matrícula"
            className="input-field"
            required
          />
        </div>
      ) : (
        <div>
          <input
            type="text"
            name="cct"
            value={credentials.cct}
            onChange={handleChange}
            placeholder="CCT"
            className="input-field"
            required
          />
        </div>
      )}

      <div>
        <input
          type="password"
          name="password"
          value={credentials.password}
          onChange={handleChange}
          placeholder="Contraseña"
          className="input-field"
          required
        />
      </div>

      <button type="submit" className="button">Iniciar Sesión</button>
    </form>
  );
};

export default LoginForm;
