/**
 * IoRedis provides a more comprehensive and advanced API,
 * supporting Redis Cluster, Sentinel, and pipelining out
 * of the box. It's often preferred for more complex setups
 * and high-performance scenarios. However it is heavier in
 * size.
 *
 * https://www.npmjs.com/package/ioredis
 *
 * import Redis from 'ioredis';
 *
 * export const redisClient = new Redis({
 *   port,
 *   host,
 *   username: user,
 *   password
 * });
 *
 * Prefer calling this in a try-catch block and returning the
 * instance. No need to call await redisClient.connect(); for
 * this case, as it automatically connects when creating a new
 * instance.
 */
import { createClient } from 'redis';
import { ENV_VARS } from '@/constants';
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
    winstonLogger.error('Error connecting Redis Client:', error);
  }
}

export async function disconnectRedis() {
  /**
   * Gracefully close a client's connection to Redis, by sending the
   * QUIT command to the server. Before quitting, the client executes
   * any remaining commands in its queue, and will receive replies
   * from Redis for each of them.
   *
   * The "disconnect" method forcibly close a client's connection to
   * Redis immediately.
   */
  try {
    await redisClient.quit();
    winstonLogger.info('Redis Client disconnected!');
  } catch(error) {
    winstonLogger.error('Error disconnecting Redis Client:', error);
  }
}

