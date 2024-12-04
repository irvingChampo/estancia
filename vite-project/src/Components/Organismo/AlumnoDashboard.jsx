import React, { useState } from 'react';
import './AlumnoDashboard.css'; // Importar el CSS para el header y el cuerpo

const AlumnoDashboard = () => {
  const [showTable, setShowTable] = useState(false);
  const [grade, setGrade] = useState('');
  const [group, setGroup] = useState('');

  const handleShowTable = () => {
    setShowTable(true);
  };

  const handleGradeChange = (e) => {
    setGrade(e.target.value);
  };

  const handleGroupChange = (e) => {
    setGroup(e.target.value);
  };

  const handleLogout = () => {
    // Implementar lógica de cierre de sesión aquí
    alert('Cierre de sesión');
  };

  return (
    <div className="alumno-dashboard">
      <header className="alumno-header">
        <div className="alumno-header-left">
          <img src="/img/result.png" alt="Logo" className="header-logo"/>
          <span className="school-name">Escuela Juan Ruiz de Alarcón</span>
        </div>
        <div className="alumno-header-right">
          <div className="student-info">
            <div className="student-details">
              <p>Angel Gabriel Garcia Samayoa</p>
              <p>Matricula: 231183</p>
              <p>Grado: 6-A</p>
              <a href="#" onClick={handleLogout} className="logout-link">Cerrar sesión</a>
            </div>
            <img src="/img/Escuela.jpg" alt="Student Profile" className="student-profile"/>
          </div>
        </div>
      </header>

      <nav className="alumno-nav">
        <a href="#inicio" className="nav-link">Inicio</a>
        <a href="#calificaciones" className="nav-link" onClick={handleShowTable}>Ver calificaciones</a>
      </nav>

      <div className="alumno-content">
        {showTable && (
          <div>
            <div>
              <label htmlFor="grade">Grado:</label>
              <input
                type="text"
                id="grade"
                value={grade}
                onChange={handleGradeChange}
                placeholder="Ingresa el grado"
                className="alumno-input-field"
              />
            </div>
            <div>
              <label htmlFor="group">Grupo:</label>
              <input
                type="text"
                id="group"
                value={group}
                onChange={handleGroupChange}
                placeholder="Ingresa el grupo"
                className="alumno-input-field"
              />
            </div>
            <table className="alumno-calificaciones-table">
              <thead>
                <tr>
                  <th className="materia-col">Materia</th>
                  <th>1º Periodo</th>
                  <th>2º Periodo</th>
                  <th>3º Periodo</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="materia-col">Matemáticas</td>
                  <td>10</td>
                  <td>9</td>
                  <td>10</td>
                </tr>
                <tr>
                  <td className="materia-col">Español</td>
                  <td>8</td>
                  <td>7</td>
                  <td>9</td>
                </tr>
                {/* Agregar más materias y calificaciones aquí */}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AlumnoDashboard;
