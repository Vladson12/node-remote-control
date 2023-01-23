import { WebSocketServer, createWebSocketStream } from 'ws';
import dotenv from 'dotenv';
import { handleMessage } from './commandHandler';

dotenv.config();

const port = +process.env.PORT! ?? 8100;

const webSocketServer = new WebSocketServer({ port });
console.log(`WebSocket server started on port ${webSocketServer.options.port}`);

webSocketServer.on('connection', (ws, req) => {
  let clientIPAddress = req.socket.remoteAddress;
  if (clientIPAddress === '::1') {
    clientIPAddress = 'localhost';
  }
  const clientPort = req.socket.remotePort;
  console.log(
    `Connection opened by client on ${clientIPAddress}:${clientPort}`,
  );

  ws.on('close', () => {
    console.log(
      `Connection closed by client on ${clientIPAddress}:${clientPort}`,
    );
  });

  const wsStream = createWebSocketStream(ws, {
    decodeStrings: false,
  });

  wsStream.on('data', async (data) => {
    try {
      console.log(`received: ${data}`);
      const result = await handleMessage(data);
      wsStream.write(result);
    } catch (err: any) {
      console.error(err.message!);
      const strData = data.toString();
      wsStream.write(`${strData.split(' ').join('_')}(error)`);
    }
  });
});

process.on('SIGINT', () => {
  webSocketServer.clients.forEach((ws) => {
    ws.close();
  });
  console.log(
    `All WebSocket connections on port ${webSocketServer.options.port} closed`,
  );

  webSocketServer.close((err) => {
    if (err) {
      console.error(
        `Can't close WebSocket server on port ${webSocketServer.options.port}`,
      );
      process.exit(1);
    }
    console.log(
      `WebSocket server closed on port ${webSocketServer.options.port}`,
    );
    process.exit(0);
  });
});
