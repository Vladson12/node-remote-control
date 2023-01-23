import { WebSocketServer, createWebSocketStream } from 'ws';
import dotenv from 'dotenv';
import { handleMessage } from './commandHandler';

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

  const wsStream = createWebSocketStream(ws, {
    decodeStrings: false,
  });

  wsStream.on('data', async (data) => {
    try {
      console.log('received: %s', data);
      const result = await handleMessage(data);
      wsStream.write(result);
    } catch (err: any) {
      console.log(err);
    }
  });
});
