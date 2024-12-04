const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });

let students = []; // Aquí puedes almacenar los estudiantes

wss.on('connection', ws => {
  console.log('Cliente conectado');

  // Envía los datos actuales a un nuevo cliente
  ws.send(JSON.stringify(students));

  ws.on('message', message => {
    const data = JSON.parse(message);
    
    if (data.type === 'ADD_STUDENT') {
      students.push(data.student);
      // Envía el nuevo estudiante a todos los clientes
      wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify({ type: 'UPDATE_STUDENTS', students }));
        }
      });
    }
  });
});

console.log('Servidor WebSocket corriendo en ws://localhost:8080');
