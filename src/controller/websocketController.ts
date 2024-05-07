// src/controllers/websocketController.ts
import { Socket } from 'socket.io';

// Store active user sessions
const activeSessions: { [userId: string]: Socket } = {};

export const handleWebSocketConnection = (socket: Socket) => {
  console.log(`Socket connected: ${socket.id}`);

  socket.on('authenticate', (userId: string) => {
    if (activeSessions[userId]) {
      activeSessions[userId].emit('forceLogout');
      delete activeSessions[userId];
    }

    activeSessions[userId] = socket;
  });

  socket.on('sendMessage', (message: string) => {
    socket.broadcast.emit('newMessage', message);
  });

  socket.on('disconnect', () => {
    console.log(`Socket disconnected: ${socket.id}`);
    
    const userId = Object.keys(activeSessions).find(key => activeSessions[key] === socket);
    if (userId) {
      delete activeSessions[userId];
    }
  });
};
