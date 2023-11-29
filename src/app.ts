// import express from 'express';
// import http from 'http';
// import { Server, Socket } from 'socket.io';
// import { io } from 'socket.io-client';

// const app = express();
// const server = http.createServer(app);
// const socketServer = new Server(server);

// app.get('/', (req, res) => {
//   res.send('Hello World!');
// });

// const socket = io('http://localhost:8080');

// const PORT = 8080;
// server.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });

// socketServer.on('error', (error) => {
//   console.error(`WebSocket error: ${error.message}`);
// });

// socketServer.on('connection', (socket: Socket) => {
//   console.log('A user connected');

//   // Handle events
//   socket.on('chat message', (msg: string) => {
//     socketServer.emit('chat message', msg);
//   });

//   socket.on('disconnect', () => {
//     console.log('User disconnected');
//   });
// });

// // Example: Emit a message to the server
// socket.emit('chat message', 'Hello, server!');

// // Example: Listen for messages from the server
// socket.on('chat message', (msg: string) => {
//   console.log(`Received message: ${msg}`);
// });