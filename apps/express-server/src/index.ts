import 'dotenv/config';
import os from 'os';
import { createServer } from 'node:http';
import { ENV_VARS } from '@/app-constants';
import { winstonLogger } from '@/middleware';
import app from './app';

const hostName = os.hostname();
const port = ENV_VARS.port;

function bootstrap() {
  const server = createServer(app);
  server.listen(port, () => {
    winstonLogger.info(
      `[ ⚡️ ${hostName} ⚡️ ] - Server running on port ${port}`
    );
  });
}

bootstrap();
