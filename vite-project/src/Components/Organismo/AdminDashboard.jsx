import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [form, setForm] = useState({
    grado: '',
    grupo: '',
    maestro: ''
  });

  const [students, setStudents] = useState([]);
  const [studentForm, setStudentForm] = useState({
    nombre: '',
    apellido: '',
    curp: '',
    imagen: ''
  });

  const [selectedGroup, setSelectedGroup] = useState('');

  useEffect(() => {
    const savedStudents = localStorage.getItem('students');
    if (savedStudents) {
      setStudents(JSON.parse(savedStudents));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('students', JSON.stringify(students));
  }, [students]);

  const handleFormChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleStudentFormChange = (e) => {
    if (e.target.name === 'imagen') {
      setStudentForm({
        ...studentForm,
        imagen: URL.createObjectURL(e.target.files[0])
      });
    } else {
      setStudentForm({
        ...studentForm,
        [e.target.name]: e.target.value
      });
    }
  };

  const handleStudentSubmit = (e) => {
    e.preventDefault();
    const id = uuidv4().slice(0, 8);
    setStudents([
      ...students,
      { id, ...form, ...studentForm }
    ]);
    setStudentForm({
      nombre: '',
      apellido: '',
      curp: '',
      imagen: ''
    });
  };

  const handleDeleteStudent = (id) => {
    setStudents(students.filter(student => student.id !== id));
  };

  const handleEditStudent = (id) => {
    const student = students.find(student => student.id === id);
    setStudentForm(student);
    handleDeleteStudent(id);
  };

  const groupByGradeAndGroup = () => {
    const grouped = students.reduce((acc, student) => {
      const key = `${student.grado}-${student.grupo}`;
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(student);
      return acc;
    }, {});

    return Object.keys(grouped).map(key => ({
      gradeGroup: key,
      students: grouped[key]
    }));
  };

  const groupedStudents = groupByGradeAndGroup();
  const filteredStudents = groupedStudents.find(({ gradeGroup }) => gradeGroup === selectedGroup)?.students || [];

  return (
    <div className="dashboard-container">
      <header className="header-section">
        <div className="menu">
          <div className="logo">
            Escuela Benemérito
          </div>
          <div className="menu-item">Inicio</div>
          <div className="menu-item">Registrar Alumnos</div>
        </div>
      </header>
      <div className="main-content">
        <h3>Registrar Alumnos</h3>
        <div className="form-wrapper">
          <form onSubmit={handleStudentSubmit} className="form-style">
            <div className="field-group">
              <input
                type="text"
                name="grado"
                value={form.grado}
                onChange={handleFormChange}
                placeholder="Grado"
                className="input-box"
                required
              />
              <input
                type="text"
                name="grupo"
                value={form.grupo}
                onChange={handleFormChange}
                placeholder="Grupo"
                className="input-box"
                required
              />
            </div>
            <div className="field-group">
              <input
                type="text"
                name="maestro"
                value={form.maestro}
                onChange={handleFormChange}
                placeholder="Nombre del Maestro"
                className="input-box"
                required
              />
              <input
                type="text"
                name="nombre"
                value={studentForm.nombre}
                onChange={handleStudentFormChange}
                placeholder="Nombre del Alumno"
                className="input-box"
                required
              />
            </div>
            <div className="field-group">
              <input
                type="text"
                name="apellido"
                value={studentForm.apellido}
                onChange={handleStudentFormChange}
                placeholder="Apellido del Alumno"
                className="input-box"
                required
              />
              <input
                type="text"
                name="curp"
                value={studentForm.curp}
                onChange={handleStudentFormChange}
                placeholder="CURP del Alumno"
                className="input-box"
                required
              />
            </div>
            <div className="field-group">
              <input
                type="file"
                name="imagen"
                onChange={handleStudentFormChange}
                className="input-box"
                accept="image/*"
              />
            </div>
            <button type="submit" className="submit-btn">Registrar Alumno</button>
          </form>
        </div>

        <h3>Lista de Alumnos</h3>
        <div>
          <label>Selecciona un Grupo: </label>
          <select value={selectedGroup} onChange={e => setSelectedGroup(e.target.value)}>
            <option value="">Seleccionar...</option>
            {groupedStudents.map(({ gradeGroup }) => (
              <option key={gradeGroup} value={gradeGroup}>{gradeGroup}</option>
            ))}
          </select>
        </div>

        {selectedGroup && (
          <table className="student-list-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Grado</th>
                <th>Grupo</th>
                <th>Maestro</th>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>CURP</th>
                <th>Imagen</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map(student => (
                <tr key={student.id}>
                  <td>{student.id}</td>
                  <td>{student.grado}</td>
                  <td>{student.grupo}</td>
                  <td>{student.maestro}</td>
                  <td>{student.nombre}</td>
                  <td>{student.apellido}</td>
                  <td>{student.curp}</td>
                  <td><img src={student.imagen} alt={student.nombre} className="profile-image" /></td>
                  <td>
                    <button onClick={() => handleEditStudent(student.id)}>Editar</button>
                    <button onClick={() => handleDeleteStudent(student.id)}>Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
