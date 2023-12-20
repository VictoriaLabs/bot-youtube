
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

io.on('connection', (socket) => {
  console.log('Un client s\'est connecté');

  // Gérer les événements du client
  socket.on('message', (data) => {
    console.log('Message reçu du client:', data);
  });

  // Gérer la déconnexion du client
  socket.on('disconnect', () => {
    console.log('Un client s\'est déconnecté');
  });
});

server.listen(4001, () => {
  console.log('Le serveur WebSocket est en écoute sur le port 4000');
});
