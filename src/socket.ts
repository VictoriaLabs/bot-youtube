import { Socket } from 'socket.io-client';
import * as dotenv from 'dotenv';

dotenv.config();

//connect to the server
const socket: Socket = require('socket.io-client')(`${process.env.SERVER_LINK}:${process.env.SERVER_PORT}`);

//emit and listen to events
function emitEvent(eventName: string, data: any): void {
    if (socket.connected)
      socket.emit(eventName, data);
    else
      console.log('Le socket n\'est pas connecté.');
};

//listen to events
function onEvent(eventName: string, callback: any): void {
    socket.on(eventName, callback);
};

//disconnect from the server
function disconnect(): void {
    socket.disconnect();
    console.log('Déconnecté du serveur WebSocket');
};

export { emitEvent, onEvent, disconnect, socket };