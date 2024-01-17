// const socket = require('socket.io-client')('http://localhost:4000');

// function emitEvent(eventName, data) {
//     if (socket.connected)
//       socket.emit(eventName, data);
//     else
//       console.log('Le socket n\'est pas connecté.');
// };

// function onEvent(eventName, callback) {
//     socket.on(eventName, callback);
// };

// function disconnect() {
//     socket.disconnect();
//     console.log('Déconnecté du serveur WebSocket');
// };

// module.exports = { emitEvent, onEvent, disconnect };

import dotenv from "dotenv";
import { Socket } from 'socket.io-client';

dotenv.config();
const PORT = process.env.PORT;

console.log(`${PORT}`);
const socket: Socket = require('socket.io-client')(`http://localhost:${PORT}`);

function emitEvent(eventName: string, data: any): void {
    if (socket.connected)
      socket.emit(eventName, data);
    else
      console.log('Le socket n\'est pas connecté.');
};

function onEvent(eventName: string, callback: (...args: any[]) => void): void {
    socket.on(eventName, callback);
};

function disconnect(): void {
    socket.disconnect();
    console.log('Déconnecté du serveur WebSocket');
};

export { emitEvent, onEvent, disconnect };