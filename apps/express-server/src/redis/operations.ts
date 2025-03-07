/**
 * For a complete list of redis commands:
 * https://redis.io/docs/latest/commands/
 */
import { redisClient } from '.';
import { winstonLogger } from '@/middleware';
import { printObject, scanSet, scanSortedSet } from '@/utils';

export async function performRedisOps() {
  try {
    /* ----- String ----- */
    const setResult = await redisClient.set('hello', 'world');
    winstonLogger.info(`setResult: ${setResult}`);
    const getResult = await redisClient.get('hello');
    winstonLogger.info(`getResult: ${getResult}`);
    const nullVal = await redisClient.get('null');
    winstonLogger.info(`nullVal: ${nullVal}`);

    /**
     * Setting & Getting Integer and Float values. Their value
		 * will be returned as string by redis, so make sure to cast
		 * to int/float when using in your application.
     */
    await redisClient.set('age', 25);
    const age = await redisClient.get('age');
    winstonLogger.info(`age: ${age}, type: ${typeof age}`);

    await redisClient.incrBy('age', 5);
    const newAge = await redisClient.get('age');
    winstonLogger.info(`newAge: ${newAge}`);

    await redisClient.set('balance', 20.45);
    await redisClient.incrByFloat('balance', 2.23);
    const newBalance = await redisClient.get('balance');
    winstonLogger.info(`newBalance: ${newBalance}, type: ${typeof newBalance}`);

    /* ----- Hash ----- */
    await redisClient.hSet('sessionInfo', {
      id: 132434242434,
      expires_at: 321432423434,
      token: 'dnwjed31m3'
    });
    const sessionId = await redisClient.hGet('sessionInfo', 'id');
    winstonLogger.info(`sessionId: ${printObject(sessionId)}`);
    const sessionInfo = await redisClient.hGetAll('sessionInfo');
    winstonLogger.info(`sessionInfo: ${printObject(sessionInfo)}`);

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
    winstonLogger.info(`planetsList: ${printObject(planetsList)}`);

    await redisClient.lRem('planets', 1, 'pluto');
    const newPlanetsList = await redisClient.lRange('planets', 0, -1);
    winstonLogger.info(`planetsList: ${printObject(newPlanetsList)}`);

    /* ----- Set ----- */
    await redisClient.sAdd('planetSet', planets);
    /* Avoid using for large data, use sScan instead */
    const planetSet = await redisClient.sMembers('planetSet');
    winstonLogger.info(`planetSet: ${printObject(planetSet)}`);

    const usersList = Array.from({ length: 500 }, (_, i) => `user:${i + 1}`);
    await redisClient.sAdd('users', usersList);
    const setsResult = await scanSet('users', 'user:2*', 50);
    winstonLogger.info(`Set "users" members: ${printObject(setsResult)}`);

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
    winstonLogger.info(`productRatings: ${printObject(productRatings)}`);
    const sortedSetResult = await scanSortedSet('product:rating');
    winstonLogger.info(`Sorted Set "productRatings" members: ${printObject(sortedSetResult)}`);

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
    winstonLogger.info(`jsonObj: ${printObject(jsonObj)}`);

    /* Returns ['Melbourne'] */
    const city = await redisClient.json.get('jsonObj', { path: '$.address.city' });
    winstonLogger.info(`city: ${printObject(city)}`);

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
    winstonLogger.info(`nycCoords: ${printObject(nycCoords)}`);

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
    winstonLogger.info(`nearby: ${printObject(nearby)}`);

    const nearbySilicy = await redisClient.geoSearch(
      'cities',
      'Silicy',
      {
        radius: 500,
        unit: 'km'
      }
    );
    winstonLogger.info(`nearbySilicy: ${printObject(nearbySilicy)}`);
  } catch (error) {
    winstonLogger.error('Error performing redis ops ', error);
  }
}
