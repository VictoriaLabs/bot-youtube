import { io } from 'socket.io-client';

const socket = io('http://localhost:8080');

// Example: Emit a message to the server
socket.emit('chat message', 'Hello, server!');

// Example: Listen for messages from the server
socket.on('chat message', (msg: string) => {
  console.log(`Received message: ${msg}`);
});
