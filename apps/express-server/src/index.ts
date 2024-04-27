import 'dotenv/config';
import os from 'os';
import { createServer } from 'node:http';
import { Server } from 'socket.io';
import uuid from 'uuid';
import { ENV_VARS } from 'app-constants';
import { winstonLogger } from 'middleware';
import app from './app';

const hostName = os.hostname();
const port = ENV_VARS.port;

function bootstrap() {
  /* DB Connection Logic */
  // try {
  //   await mongoose.connect(db_connection_string, { autoIndex: true });
  //   console_log('Connected to DATABASE', `${db_name}@${db_url}`);
  // } catch (err) {
  //   console.log(chalk.red('⚠ Error connecting to the Database ⚠'));
  //   console.log(err);
  //   process.exit(1);
  // }

  const server = createServer(app);
  const io = new Server(server, {
    /**
     * Need to explicitly enable cors
     *
     * https://socket.io/docs/v4/handling-cors/
     */
    cors: {
      origin: [
        'http://localhost:3000', 'http://localhost:3001'
        // "https://example.com"
      ]
    }
  });

  /**
   * Server Instance methods
   *
   * https://socket.io/docs/v4/server-instance/
   */

  /* generate a custom session ID (the sid query parameter) */
  io.engine.generateId = req => uuid.v4();

  /**
   * initial_headers: will be emitted just before writing the
   * response headers of the first HTTP request of the
   * session (the handshake), allowing you to customize them.
   */
  io.engine.on('initial_headers', (headers, req) => {
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
  io.engine.on('headers', (headers, req) => {
    winstonLogger.info('Sending Headers...');
    headers.test = '789';
  });

  io.engine.on('connection_error', err => {
    /* the request object */
    console.log(err.req);
    /* the error code, for example 1 */
    console.log(err.code);
    /* the error message, for example "Session ID unknown" */
    console.log(err.message);
    /* some additional error context */
    console.log(err.context);
  });

  /*  number of currently connected clients */
  const count = io.engine.clientsCount;
  winstonLogger.info(`Total clients connected - ${count}`);

  /**
   * Socket middleware.
   *
   * Write application logic in the below function.
   * If sucess, call next() and if error call
   * next(error), which might disconnect the connection.
   *
   * You can register several middleware functions,
   * and they will be executed sequentially
   */
  io.use((socket, next) => {
    // if (isValid(socket.request)) {
    // } else {
    //   next(new Error("invalid"));
    // }
    next();
  });

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
    console.log('Socket Room ', socket.rooms);

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

  server.listen(port, () => {
    winstonLogger.info(
      `[ ⚡️ ${hostName} ⚡️ ] - Server running on port ${port}`
    );
  });
}

bootstrap();
