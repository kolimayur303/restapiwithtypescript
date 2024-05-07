import express, { Request, Response } from "express";
import WebSocket from "ws";
import userRouter from "./src/routes";

const port = 3000;
const app = express();
const wss = new WebSocket.Server({ noServer: true });

// WebSocket server
wss.on('connection', (ws: WebSocket) => {
  console.log('New client connected');

  ws.on('message', (message: string) => {
    console.log(`Received message: ${message}`);
    wss.clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        (client as WebSocket).send(`Server received your message: ${message}`);
      }
    });
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

// Express API
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/user", userRouter)

const server = app.listen(port, () => {
  console.log(`API started at http://localhost:${port}`);
});

server.on('upgrade', (request, socket, head) => {
  wss.handleUpgrade(request, socket, head, (ws: WebSocket) => {
    wss.emit('connection', ws, request);
  });
});
