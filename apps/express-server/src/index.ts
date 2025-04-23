import 'dotenv/config';
import os from 'os';
import { createServer } from 'node:http';
import { v4 as uuidv4 } from 'uuid';
import { connect, disconnect } from 'mongoose';
import { Server } from 'socket.io';
import {
  type ClientToServerEvents,
  type ServerToClientEvents,
  type InterServerEvents,
  type SocketData
} from '@csl/react-express';
import { ENV_VARS } from '@/constants';
import { loadSSMParameters } from '@/aws';
import { connectPostgresDB, disconnectPostgresDB } from '@/db/postgres';
import { connectMySQLDB, disconnectMySQLDB } from '@/db/mysql';
import { winstonLogger } from '@/middleware';
import { connectToRedis } from '@/redis';
import { printObject } from '@/utils';
import app from './app';

const hostName = os.hostname();
const port = ENV_VARS.port;
const dbConnectionString = `${ENV_VARS.mongoDB.url}/${ENV_VARS.mongoDB.dbName}`;

const server = createServer(app);

export const io = new Server<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
>(server, {
  /**
   * Need to explicitly enable cors
   *
   * https://socket.io/docs/v4/handling-cors/
   */
  cors: {
    origin: ['http://localhost:3000', 'http://localhost:3001']
  },
  connectionStateRecovery: {
    /* the backup duration of the sessions and the packets */
    maxDisconnectionDuration: 2 * 60 * 1000,
    /* whether to skip middlewares upon successful recovery */
    skipMiddlewares: true
  }
});

/**
 * Server Instance methods
 *
 * https://socket.io/docs/v4/server-instance/
 */

/* generate a custom session ID (the sid query parameter) */
io.engine.generateId = () => uuidv4();

/**
 * initial_headers: will be emitted just before writing the
 * response headers of the first HTTP request of the
 * session (the handshake), allowing you to customize them.
 */
io.engine.on('initial_headers', headers => {
  winstonLogger.info('Sending Initial Headers !');
  headers.test = '123';
  headers['set-cookie'] = 'mycookie=456';
});

/**
 * headers: will be emitted just before writing the
 * response headers of each HTTP request of the session
 * (including the WebSocket upgrade), allowing you to
 * customize them.
 */
io.engine.on('headers', headers => {
  winstonLogger.info('Sending Headers...');
  headers.test = '789';
});

io.engine.on('connection_error', err => {
  /* the request object */
  winstonLogger.error(err.req);
  /* the error code, for example 1 */
  winstonLogger.error(err.code);
  /* the error message, for example "Session ID unknown" */
  winstonLogger.error(err.message);
  /* some additional error context */
  winstonLogger.error(err.context);
});

/**
 * Socket middleware.
 *
 * Write application logic in the below function.
 * If sucess, call next() and if error call
 * next(error), which might disconnect the connection.
 *
 * socket.use(([event, ...args], next) => {
 *   next();
 * });
 *
 * You can register several middleware functions, and they
 * will be executed sequentially:
 * io.use((socket, next) => {
 *   if (isValid(socket.request)) {
 *     next();
 *   } else {
 *     next(new Error("invalid"));
 *   }
 * });
 */

io.on('connection', socket => {
  /**
   * Each new connection is assigned a random 20-characters
   * identifier which is synced with the value on the
   * client-side, ie the values of both socket.id on client
   * and server are equal for a particular connection.
   *
   * FYI: The Id attribute is an ephemeral ID that is not meant
   * to be used in your application (or only for debugging purposes)
   * Use a regular session ID instead (either sent in a cookie,
   * or stored in the localStorage and sent in the auth payload)
   */
  winstonLogger.info(`Socket connection established with Id - ${socket.id}`);
  winstonLogger.info(`Socket Room: ${printObject(socket.rooms)}`);

  /*  number of currently connected clients */
  const count = io.engine.clientsCount;
  winstonLogger.info(`Total clients connected - ${count}`);

  /**
   * recovery was successful: socket.id, socket.rooms and socket.data
   * were restored.
   *
   * if (socket.recovered) {
   * } else {}
   */

  /**
   * Catch-all listeners - Called for an incoming event
   *
   * socket.onAny((eventName, ...args) => {
   *   console.log(eventName); // 'hello'
   *   console.log(args); // [ 1, '2', { 3: '4', 5: ArrayBuffer (1) [ 6 ] } ]
   * });
   *
   * Similarly, for outgoing packets, use
   * socket.onAnyOutgoing((eventName, ...args) => {}
   */

  socket.emit('basicEmit', 1, '2', Buffer.from([3]));

  socket.on('submitForm', (inputValue, ack) => {
    winstonLogger.info('--- submitForm event ---');
    ack({ message: `Server received inputValue: ${inputValue}` });
  });

  /**
   * socket.on("disconnecting", (reason) => {
   *
   * This event is similar to disconnect but is fired a
   * bit earlier, when the Socket#rooms set is not empty yet.
   */
  socket.on('disconnect', reason => {
    winstonLogger.info(`Disconnected - ${reason}`);
  });
});

async function bootstrap() {
  try {
    if (ENV_VARS.env !== 'development') {
      await loadSSMParameters(`/${ENV_VARS.env}/`);
    }
    await connectPostgresDB();
    await connectMySQLDB();
    await connect(dbConnectionString);
    winstonLogger.info(`[ ⚡️ ${hostName} ⚡️ ] - Connected to MongoDB`);
    await connectToRedis();

    server.listen(port, () => {
      winstonLogger.info(
        `[ ⚡️ ${hostName} ⚡️ ] - Server running on port ${port}`
      );
    });
  } catch (err) {
    winstonLogger.error('Error in starting server: ', err);
    process.exit(1);
  }
}

/* Gracefully handle SIGTERM or SIGINT */
async function handleExit(signal: string) {
  winstonLogger.info(`Received ${signal}`);
  try {
    await disconnectPostgresDB();
    await disconnectMySQLDB();
    await disconnect();
  } catch (error) {
    winstonLogger.error('Error while disconnecting from the database:', error);
  } finally {
    process.exit(0);
  }
}

process.on('SIGTERM', () => handleExit('SIGTERM'));
process.on('SIGINT', () => handleExit('SIGINT'));

bootstrap();
