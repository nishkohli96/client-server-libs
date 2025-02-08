import { io, Socket } from 'socket.io-client';
import { ServerToClientEvents, ClientToServerEvents } from '@csl/react-express';
import { ENV_VARS } from 'app-constants';
/**
 * "undefined" means the URL will be computed from the
 * `window.location` object
 *
 * const URL = process.env.NODE_ENV === 'production' ?
 *   undefined : 'http://localhost:4000';
 */

const URL = ENV_VARS.serverURL;

/**
 * On the client side, you can reuse the same ServerToClientEvents
 * and ClientToServerEvents interfaces, the only difference being
 * that the types are REVERSED.
 */
export const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(URL, {
  /* defaults to 1000 */
  reconnectionDelay: 10000,
  /* defaults to 5000 */
  reconnectionDelayMax: 10000
});
