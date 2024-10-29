/**
 * Seeder to set the salary as a random 5 digit number for X % of the
 * total number of records in the database, in this case X=80. 
 */
import mongoModels from '@csl/mongo-models';

const peopleCollection = mongoModels.collectionNames.people;
const percentOfPeopleToSetSalary = 0.8;

const generateRandomSalary = () => {
  return Math.round(Math.random() * 100000);
};

export const up = async (db, client) => {
  const totalRecords = await db.collection(peopleCollection).countDocuments();
  const recordsToUpdate = Math.floor(totalRecords * percentOfPeopleToSetSalary);

  // Get a random sample of IDs to update
  const randomPeople = await db
    .collection(peopleCollection)
    .aggregate([{ $sample: { size: recordsToUpdate } }])
    .toArray();

  // Prepare bulk update operations
  const bulkOps = randomPeople.map(person => ({
    updateOne: {
      filter: { _id: person._id },
      update: { $set: { salary: generateRandomSalary() } }
    }
  }));

  // Execute bulk write operations
  if (bulkOps.length > 0) {
    await db.collection(peopleCollection).bulkWrite(bulkOps);
  }
};

export const down = async (db, client) => {
  await db
    .collection(peopleCollection)
    .updateMany({ salary: { $exists: true } }, { $unset: { salary: '' } });
};
