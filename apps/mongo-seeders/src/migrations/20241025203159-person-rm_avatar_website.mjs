/**
 * Remove avatar and website fields from documents with value ''
 * when inserted after running seeders.
 */
import mongoModels from '@csl/mongo-models';

const peopleCollection = mongoModels.collectionNames.people;

export const up = async (db) => {
  await db
    .collection(peopleCollection)
    .updateMany({ avatar: '' }, { $unset: { avatar: '' } });
  await db
    .collection(peopleCollection)
    .updateMany({ website: '' }, { $unset: { website: '' } });
};

export const down = async (db) => {
  await db
    .collection(peopleCollection)
    .updateMany({ avatar: '' }, { $set: { avatar: '' } });
  await db
    .collection(peopleCollection)
    .updateMany({ website: '' }, { $set: { website: '' } });
};
