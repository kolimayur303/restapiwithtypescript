import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import authRoutes from './src/routes/authRoutes';
import resourceRoutes from './src/routes/resourceRoutes';
import { handleWebSocketConnection } from './src/controller/websocketController';

const app = express();
const server = http.createServer(app);
const io: Server = new Server(server);

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/auth', authRoutes);
app.use('/api', resourceRoutes);

// WebSocket connection handler
io.on('connection', handleWebSocketConnection);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
