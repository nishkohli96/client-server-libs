/**
 * Remove address and website fields from documents with value '' 
 * when inserted after running seeders.
 */
import { collectionName } from '../constants';

const peopleCollection = collectionName.people;

export const up = async (db, client) => {
  await db
    .collection(peopleCollection)
    .updateMany({ address: '' }, { $unset: { address: '' } });
  await db
    .collection(peopleCollection)
    .updateMany({ website: '' }, { $unset: { website: '' } });
};

export const down = async (db, client) => {
  await db
    .collection(peopleCollection)
    .updateMany({ address: '' }, { $set: { address: '' } });
  await db
    .collection(peopleCollection)
    .updateMany({ website: '' }, { $set: { website: '' } });
};
