/**
 * Seeder to convert the type of address.houseNo to string if
 * it exists for a document. String type handles cases like "22-B"
 * and also help in querying fullAddress in dataTable which was failing
 * when its type was set as a number.
 */
import mongoModels from '@csl/mongo-models';

const peopleCollection = mongoModels.collectionNames.people;

async function getPeopleWithHouseNoInAddress(db) {
  return await db
    .collection(peopleCollection)
    .find({ 'address.houseNo': { $exists: true } })
    .toArray();
}

export const up = async (db) => {
  const peopleWithHouseNumberInAddress = await getPeopleWithHouseNoInAddress(db);
  const bulkOps = peopleWithHouseNumberInAddress.map(person => ({
    updateOne: {
      filter: { _id: person._id },
      update: { $set: { 'address.houseNo': `${person.address.houseNo}` } }
    }
  }));

  if (bulkOps.length > 0) {
    await db.collection(peopleCollection).bulkWrite(bulkOps);
  }
};

/**
 * Convert back houseNo as strings to number type. In case if for any houseNo,
 * isNaN(houseNo) === true, unset this field for a document, to prevent any errors.
 */
export const down = async (db) => {
  const peopleWithHouseNumberInAddress = await getPeopleWithHouseNoInAddress(db);
  const bulkOps = peopleWithHouseNumberInAddress.map(person => {
    const houseNo = Number(person.address.houseNo);
    let updateCondition = {
      $set: { 'address.houseNo': Number(person.address.houseNo) }
    };
    if (isNaN(houseNo)) {
      updateCondition = { $unset: { 'address.houseNo': '' } };
    }
    return {
      updateOne: {
        filter: { _id: person._id },
        update: updateCondition
      }
    };
  });
  if (bulkOps.length > 0) {
    await db.collection(peopleCollection).bulkWrite(bulkOps);
  }
};
