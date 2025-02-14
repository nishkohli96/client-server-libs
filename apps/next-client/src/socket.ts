/* https://socket.io/how-to/use-with-nextjs */
'use client';

import { io } from 'socket.io-client';
import { ENV_VARS } from '@/app-constants';

export const socket = io(ENV_VARS.expressServerURL, {
  /* defaults to 1000 */
  reconnectionDelay: 10000,
  /* defaults to 5000 */
  reconnectionDelayMax: 10000
});
