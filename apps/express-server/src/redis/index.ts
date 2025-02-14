import { createClient } from 'redis';
import { ENV_VARS } from '@/app-constants';
import { winstonLogger } from '@/middleware';

const { user, password, host, port } = ENV_VARS.redis;

export const redisClient = createClient({
  username: user,
  password,
  socket: {
    host,
    port
  }
});

export async function connectToRedis() {
  try {
    await redisClient.connect();
    winstonLogger.info('Redis Client connected!');
  } catch(error) {
    winstonLogger.error('Error connecting Redis Client', error);
  }
}

