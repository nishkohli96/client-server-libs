import { io } from 'socket.io-client';
import { ENV_VARS } from 'app-constants';
/**
 * "undefined" means the URL will be computed from the
 * `window.location` object
 *
 * const URL = process.env.NODE_ENV === 'production' ?
 *   undefined : 'http://localhost:4000';
 */

const URL = ENV_VARS.serverURL;
export const socket = io(URL, {
  /* defaults to 1000 */
  reconnectionDelay: 10000,
  /* defaults to 5000 */
  reconnectionDelayMax: 10000
});
