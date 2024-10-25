import { faker } from '@faker-js/faker';
import { collectionNames } from '@csl/mongo-models';

const getPersonJob = () => faker.person.jobTitle();
const peopleCollection = collectionNames.people;

export const up = async (db, client) => {
  const session = client.startSession();
  try {
    await session.withTransaction(async () => {
      const persons = await db.collection(peopleCollection).find({}).toArray();

      const operations = persons.map(person => ({
        updateOne: {
          filter: { _id: person._id },
          update: { $set: { profession: getPersonJob() } }
        }
      }));

      if (operations.length > 0) {
        await db.collection(peopleCollection).bulkWrite(operations);
      }
    });
  } finally {
    await session.endSession();
  }
};

export const down = async (db, client) => {
  const session = client.startSession();
  try {
    await session.withTransaction(async () => {
      await db
        .collection('Person')
        .updateMany({}, { $unset: { profession: '' } });
    });
  } finally {
    await session.endSession();
  }
};
