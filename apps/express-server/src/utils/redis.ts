import { winstonLogger } from '@/middleware';
import { redisClient } from '@/redis';
import { SortedSetMember, SScanResult, ZScanResult } from '@/types';
import { printObject } from '@/utils';

/**
 * Always use sScan, hScan or zScan over methods like sMembers
 * as the latter returns all set elements with O(n) complexity
 * and can be time consuming for large datasets.
 *
 * MatchPattern: '*' matches all elements. For matching elements
 * that contain '2' use '*2*' as the wildcard.
 * Count here is the number of elements to scan in one iteration.
 * The iteration stops when 0 is returned as the cursor value.
 */
export async function scanSet(
  key: string,
  matchPattern = '*',
  count = 20,
  cursor = 0,
  results: string[] = []
) {
  const { cursor: newCursor, members }: SScanResult = await redisClient.sScan(
    key,
    cursor,
    {
      MATCH: matchPattern,
      COUNT: count
    }
  );
  results.push(...members);

  if (newCursor !== 0) {
    return scanSet(key, matchPattern, count, newCursor, results);
  }
  winstonLogger.info(`Set "${key}" members: ${printObject(results)}`);
  return results;
}

export async function scanSortedSet(
  key: string,
  matchPattern = '*',
  count = 20,
  cursor = 0,
  results: SortedSetMember[] = []
) {
  const { cursor: newCursor, members }: ZScanResult = await redisClient.zScan(
    key,
    cursor,
    {
      MATCH: matchPattern,
      COUNT: count
    }
  );
  results.push(...members);

  if (newCursor !== 0) {
    return scanSortedSet(key, matchPattern, count, newCursor, results);
  }
  winstonLogger.info(`Sorted Set "${key}" members: ${printObject(results)}`);
  return results;
}
