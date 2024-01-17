import { Socket } from 'socket.io-client';
import * as dotenv from 'dotenv';

dotenv.config();

console.log(`Connexion au serveur WebSocket ${process.env.SERVER_LINK}:${process.env.SERVER_PORT}`);
const socket: Socket = require('socket.io-client')(`${process.env.SERVER_LINK}:${process.env.SERVER_PORT}`);

function emitEvent(eventName: string, data: any): void {
    if (socket.connected)
      socket.emit(eventName, data);
    else
      console.log('Le socket n\'est pas connecté.');
};

function onEvent(eventName: string, callback: any): void {
    socket.on(eventName, callback);
};

function disconnect(): void {
    socket.disconnect();
    console.log('Déconnecté du serveur WebSocket');
};

export { emitEvent, onEvent, disconnect, socket };