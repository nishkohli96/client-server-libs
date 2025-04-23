import Redis from 'ioredis';
import { ENV_VARS } from '@/constants';

/**
 * If you are developing locally and your Redis is in AWS VPC,
 * your connection will fail unless you are inside that
 * VPC (via VPN, Bastion, or running from EC2).
 *
 * ⚠️ Key Issue: AWS ElastiCache (Redis) is in a Private VPC
 * - ElastiCache instances in AWS are almost always deployed
 *   inside a VPC (Virtual Private Cloud).
 * - Resources inside a VPC are not publicly accessible by
 *   default— meaning your laptop (which is outside the VPC)
 *   cannot connect directly to ElastiCache.
 *
 * ❓ Why?
 * - AWS ElastiCache is designed for internal communication
 *   within AWS (e.g., EC2, Lambda, ECS inside the same VPC).
 * - Direct public access to ElastiCache is blocked by design
 *   for security reasons as it is in a private subnet (no public access)
 * - Even if you open the Security Group, ElastiCache won't
 *   allow direct access from public IPs.
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

  /**
   * Elasticache can also accept redis JSON, meaning you can
   * set and get JSON objects directly. Refer the redis docs
   * under the apps/docs folder for redis commands.
   */
  /* Close the connection */
  awsRedisClient.disconnect();
}
