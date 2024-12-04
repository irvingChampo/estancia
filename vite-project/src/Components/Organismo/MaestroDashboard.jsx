import React, { useState } from 'react';
import './MaestroDashboard.css'; // Importar el CSS para el dashboard del maestro

const MaestroDashboard = () => {
  const [view, setView] = useState(''); // 'clases', 'subirCalificaciones', 'verGrupos'
  const [grade, setGrade] = useState('');
  const [group, setGroup] = useState('');
  const [students, setStudents] = useState([
    { id: 1, nombre: 'Juan', apellido: 'Pérez', curp: 'JUANP123', grado: '3', grupo: 'A', status: '' },
    { id: 2, nombre: 'María', apellido: 'López', curp: 'MARIAL456', grado: '3', grupo: 'A', status: '' }
    // Agrega más estudiantes aquí
  ]);
  const [gradesData, setGradesData] = useState({});
  const [editingGrade, setEditingGrade] = useState('');
  const [editingGroup, setEditingGroup] = useState('');
  const subjects = ['Matemáticas', 'Español', 'Ciencias', 'Ética', 'Inglés', 'Educación Física']; // Lista de materias

  // Maneja la visualización de grupos
  const handleShowGroups = () => {
    setView('verGrupos');
  };

  // Maneja el cambio de vista
  const handleShowClasses = () => {
    setView('clases');
  };

  const handleUploadGrades = () => {
    setView('subirCalificaciones');
  };

  // Maneja los cambios en los formularios
  const handleGradeChange = (e) => {
    setGrade(e.target.value);
  };

  const handleGroupChange = (e) => {
    setGroup(e.target.value);
  };

  const handleGradeDataChange = (studentId, subject, e) => {
    setGradesData(prevData => ({
      ...prevData,
      [studentId]: {
        ...prevData[studentId],
        [subject]: e.target.value
      }
    }));
  };

  const handleEditGradeChange = (e) => {
    setEditingGrade(e.target.value);
  };

  const handleEditGroupChange = (e) => {
    setEditingGroup(e.target.value);
  };

  const handleEditSubmit = () => {
    setGrade(editingGrade);
    setGroup(editingGroup);
    // Aquí podrías hacer una llamada a la API para obtener los estudiantes del nuevo grupo
    // setStudents(obtenerEstudiantes(editingGrade, editingGroup));
  };

  const handleSubmitGrades = () => {
    alert('↗ Calificación subida');
    // Aquí podrías enviar los datos a la API
  };

  const handleApprove = (studentId) => {
    setStudents(prevStudents =>
      prevStudents.map(student =>
        student.id === studentId ? { ...student, status: 'approved' } : student
      )
    );
  };

  const handleDisapprove = (studentId) => {
    setStudents(prevStudents =>
      prevStudents.map(student =>
        student.id === studentId ? { ...student, status: 'disapproved' } : student
      )
    );
  };

  // Filtra los estudiantes por grado y grupo
  const filteredStudents = students.filter(student => `${student.grado}-${student.grupo}` === `${grade}-${group}`);

  // Listado de grupos (ejemplo estático)
  const grades = ['1', '2', '3', '4', '5', '6'];
  const groups = ['A', 'B', 'C', 'D'];

  return (
    <div className="maestro-dashboard">
      <header className="maestro-header">
        <div className="maestro-menu">
          <div className="maestro-menu-item" onClick={() => setView('inicio')}>Inicio</div>
          <div className="maestro-menu-item" onClick={handleShowGroups}>Ver Grupos</div>
          <div className="maestro-menu-item" onClick={handleShowClasses}>Clases</div>
          <div className="maestro-menu-item" onClick={handleUploadGrades}>Subir Calificaciones</div>
        </div>
      </header>

      <div className="maestro-content">
        {view === 'verGrupos' && (
          <div>
            <h3>Grupos</h3>
            <div className="grupos-container">
              {grades.map((grade, index) => (
                <div key={index} className="grado-box">
                  <h4>Grado {grade}</h4>
                  <select
                    className="grupo-selector"
                    value={group}
                    onChange={handleGroupChange}
                  >
                    <option value="">Selecciona Grupo</option>
                    {groups.map((grp, i) => (
                      <option key={i} value={grp}>{grp}</option>
                    ))}
                  </select>
                  <button
                    onClick={() => { setGrade(grade); setView('verAlumnos'); }}
                    className="grupo-button"
                  >
                    Ver Alumnos
                  </button>
                  <button
                    onClick={() => {
                      setGrade(grade);
                      setEditingGrade(grade);
                      setEditingGroup(group);
                      setView('subirCalificaciones');
                    }}
                    className="grupo-button"
                  >
                    Subir Calificaciones
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {view === 'verAlumnos' && (
          <div>
            <h3>Lista de Alumnos en {grade}-{group}</h3>
            <table className="students-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Apellido</th>
                  <th>CURP</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map(student => (
                  <tr key={student.id}>
                    <td>{student.id}</td>
                    <td>{student.nombre}</td>
                    <td>{student.apellido}</td>
                    <td>{student.curp}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button onClick={() => setView('subirCalificaciones')} className="button">Subir Calificaciones</button>
          </div>
        )}

        {view === 'subirCalificaciones' && (
          <div>
            <div>
              <label htmlFor="editGrade">Grado:</label>
              <input
                type="text"
                id="editGrade"
                value={editingGrade}
                onChange={handleEditGradeChange}
                placeholder="Ingresa el grado"
                className="input-field"
              />
            </div>
            <div>
              <label htmlFor="editGroup">Grupo:</label>
              <input
                type="text"
                id="editGroup"
                value={editingGroup}
                onChange={handleEditGroupChange}
                placeholder="Ingresa el grupo"
                className="input-field"
              />
            </div>
            <button onClick={handleEditSubmit} className="button">Editar Grado y Grupo</button>

            {grade && group && (
              <div>
                <table className="table">
                  <thead>
                    <tr>
                      <th>Nombre</th>
                      <th>Apellido</th>
                      {subjects.map((subj, index) => (
                        <th key={index}>{subj}</th>
                      ))}
                      <th>Aprobar/No Aprobar</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredStudents.map(student => (
                      <tr
                        key={student.id}
                        className={
                          student.status === 'approved' ? 'approved' :
                          student.status === 'disapproved' ? 'disapproved' : ''
                        }
                      >
                        <td>{student.nombre}</td>
                        <td>{student.apellido}</td>
                        {subjects.map((subj, index) => (
                          <td key={index}>
                            <input
                              type="number"
                              placeholder="Calificación"
                              onChange={(e) => handleGradeDataChange(student.id, subj, e)}
                              className="input-field"
                            />
                          </td>
                        ))}
                        <td>
                          <button
                            className="button-approve"
                            onClick={() => handleApprove(student.id)}
                          >
                            Aprobó
                          </button>
                          <button
                            className="button-disapprove"
                            onClick={() => handleDisapprove(student.id)}
                          >
                            No Aprobó
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <button onClick={handleSubmitGrades} className="button">Subir Calificación Final</button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MaestroDashboard;
