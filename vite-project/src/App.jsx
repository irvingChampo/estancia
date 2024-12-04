import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import AlumnoDashboard from './Components/Organismo/AlumnoDashboard'; // Importar la vista del alumno
import LoginPage from './Components/Organismo/LoginPage';
import MaestroDashboard from './Components/Organismo/MaestroDashboard';
import RegistrationPage from './Components/Organismo/RegistrationPage';
import AdminDashboard from './Components/Organismo/AdminDashboard';



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/alumno" element={<AlumnoDashboard />} /> 
        <Route path="/maestro" element={<MaestroDashboard />} />
        <Route path="/administrativo" element={<AdminDashboard />} />


        {/* Ruta para el alumno */}
        {/* Agregar una ruta para el maestro si es necesario */}
      </Routes>
    </Router>
  );
}

export default App;
