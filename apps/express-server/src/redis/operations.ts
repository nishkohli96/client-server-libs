/**
 * For a complete list of redis commands:
 * https://redis.io/docs/latest/commands/
 */
import { redisClient } from '.';
import { winstonLogger } from '@/middleware';

type SScanResult = {
  cursor: number;
  members: string[]
};

type ZScanResult = {
  cursor: number;
  members: {
    score: number;
    value: string;
  }[];
}

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
async function scanSet(key: string, matchPattern = '*', count = 20) {
  let currentCursor: number | null = null;
  const results = [];
  try {
    while (currentCursor !== 0) {
      const { cursor, members }: SScanResult = await redisClient.sScan(
        key,
        currentCursor ?? 0,
        {
          MATCH: matchPattern,
          COUNT: count
        }
      );
      currentCursor = cursor;
      results.push(...members);
    }
    console.log(`Set "${key}" members:`, results);
    return results;
  } catch (error) {
    console.error('Error scanning set:', error);
  }
}

async function scanSortedSet(key: string, matchPattern = '*', count = 20) {
  let currentCursor: number | null = null;
  const results = [];
  try {
    while (currentCursor !== 0) {
      const { cursor, members }: ZScanResult
        = await redisClient.zScan(key, currentCursor ?? 0, {
          MATCH: matchPattern,
          COUNT: count
        });
      currentCursor = cursor;
      results.push(...members);
    }
    console.log(`Sorted Set "${key}" members:`, results);
    return results;
  } catch (error) {
    console.error('Error scanning set:', error);
  }
}


export async function performRedisOps() {
  try {
    /* ----- String ----- */
    const setResult = await redisClient.set('hello', 'world');
    console.log('setResult: ', setResult);
    const getResult = await redisClient.get('hello');
    console.log('getResult: ', getResult);
    const nullVal = await redisClient.get('null');
    console.log('nullVal: ', nullVal);

    /**
     * Setting & Getting Integer and Float values. Their value
		 * will be returned as string by redis, so make sure to cast
		 * to int/float when using in your application.
     */
    await redisClient.set('age', 25);
    const age = await redisClient.get('age');
    console.log('age: ', age, typeof age);

    await redisClient.incrBy('age', 5);
    const newAge = await redisClient.get('age');
    console.log('newAge: ', newAge);

    await redisClient.set('balance', 20.45);
    await redisClient.incrByFloat('balance', 2.23);
    const newBalance = await redisClient.get('balance');
    console.log('newBalance: ', newBalance, typeof newBalance);

    /* ----- Hash ----- */
    await redisClient.hSet('sessionInfo', {
      id: 132434242434,
      expires_at: 321432423434,
      token: 'dnwjed31m3'
    });
    const sessionId = await redisClient.hGet('sessionInfo', 'id');
    console.log('sessionId: ', sessionId);
    const sessionInfo = await redisClient.hGetAll('sessionInfo');
    console.log('sessionInfo: ', sessionInfo);

    /* List */
    const planets = [
      'earth',
      'mars',
      'Mars',
      'venus',
      'saturn',
      'mars',
      'jupiter',
      'neptune',
      'pluto'
    ];
    /**
     * It pushes all the elements again the 'planets' key, if I restart
     * the server multiple times.
     */
    await redisClient.rPush('planets', planets);
    const planetsList = await redisClient.lRange('planets', 0, -1);
    console.log('planetsList: ', planetsList);

    await redisClient.lRem('planets', 1, 'pluto');
    const newPlanetsList = await redisClient.lRange('planets', 0, -1);
    console.log('planetsList: ', newPlanetsList);

    /* ----- Set ----- */
    await redisClient.sAdd('planetSet', planets);
    /* Avoid using for large data, use sScan instead */
    const planetSet = await redisClient.sMembers('planetSet');
    console.log('planetSet: ', planetSet);

    const usersList = Array.from({ length: 500 }, (_, i) => `user:${i + 1}`);
    await redisClient.sAdd('users', usersList);
    scanSet('users', 'user:2*', 50);

    /* ----- Sorted Set ----- */
    /**
		 * Redis ZADD will overwrite the score if an element with
		 * the same value (member) already exists in the sorted set.
		 * The element will keep the latest score provided.
		 */
    await redisClient.zAdd('product:rating', [
      { value: 'r1', score: 9.3 },
      { value: 'r2', score: 8.9 },
      { value: 'r3', score: 9.56 },
      { value: 'r4', score: 9.14 },
      { value: 'r5', score: 9.32 },
    ]);
    /* Returns only the values */
    const productRatings = await redisClient.zRange('product:rating', 0, -1);
    console.log('productRatings: ', productRatings);
    scanSortedSet('product:rating');

    /* ----- JSON ----- */
    await redisClient.json.set('jsonObj', '$', {
      name: 'John',
      age: 23,
      address: {
        houseNo: '123-B',
        street: 'Flinders Street',
        city: 'Melbourne',
        state: 'Victoria',
        country: 'Australia'
      }
    });
    const jsonObj = await redisClient.json.get('jsonObj');
    console.log('jsonObj: ', jsonObj);

    /* Returns ['Melbourne'] */
    const city = await redisClient.json.get('jsonObj', { path: '$.address.city' });
    console.log('city: ', city);

    /* ----- Geo ----- */
    await redisClient.geoAdd('city', [
      {
        member: 'Silicy',
        latitude: 13.361389,
        longitude: 38.115556
      },
      {
        member: 'Palermo',
        latitude: 15.087269,
        longitude: 37.502669
      },
      {
        member: 'New York',
        latitude: -74.006,
        longitude: 40.7128
      },
      {
        member: 'Los Angeles',
        latitude: 34.0549,
        longitude: 118.2426
      },
      {
        member: 'Chicago',
        latitude: 41.8781,
        longitude: 87.6298
      },
    ]);
    /**
		 * The coords will be in string, so convert into integers.
		 * [
     *   {
     *     longitude: '40.71279734373092651',
     *     latitude: '-74.00599894974283188'
     *   }
     * ]
		 */
    const nycCoords = await redisClient.geoPos('city', 'New York');
    console.log('nycCoords: ', nycCoords);

    const nearby = await redisClient.geoSearch(
      'cities',
      {
        latitude: -74.006,
        longitude: 40.7128
      },
      {
        radius: 500,
        unit: 'km'
      }
    );
    console.log('nearby: ', nearby);

    const nearbySilicy = await redisClient.geoSearch(
      'cities',
      'Silicy',
      {
        radius: 500,
        unit: 'km'
      }
    );
    console.log('nearbySilicy: ', nearbySilicy);
  } catch (error) {
    winstonLogger.error('Error performing redis ops ', error);
  }
}
