import { WebSocketServer } from 'ws';
import dotenv from 'dotenv';

dotenv.config();

const port = +process.env.PORT! ?? 8100;

const webSocketServer = new WebSocketServer({ port });
console.log(
  `Web Socket Server started on port ${webSocketServer.options.port}`,
);

webSocketServer.on('connection', (ws, req) => {
  let clientIPAddress = req.socket.remoteAddress;
  if (clientIPAddress === '::1') {
    clientIPAddress = 'localhost';
  }
  const clientPort = req.socket.remotePort;
  console.log(
    `Connection opened by client on ${clientIPAddress}:${clientPort}`,
  );

  ws.on('message', (data) => {
    console.log('received: %s', data);
  });
});
