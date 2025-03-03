import Redis from 'ioredis';
import { ENV_VARS } from '@/app-constants';

/**
 * Unfortunately, this is not getting connected to the redis
 * cluster. I'm able to connect via shell.
 */
export const awsRedisClient = new Redis.Cluster(
  [
    {
      host: ENV_VARS.aws.elastiCacheRedis,
      port: 6379
    }
  ],
  {
    dnsLookup: (address, callback) => callback(null, address),
    redisOptions: {
      tls: {}
    }
  }
);

export async function awsRedisOps() {
  /* Set and assert */
  const setResult = await awsRedisClient.set('key', 'value');
  console.assert(setResult === 'OK');

  /* Get and assert */
  const getResult = await awsRedisClient.get('key');
  console.assert(getResult === 'value');

  /* Close the connection */
  awsRedisClient.disconnect();
}

