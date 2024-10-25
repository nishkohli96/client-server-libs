/**
 * Remove avatar and website fields from documents with value '' 
 * when inserted after running seeders.
 */
import { collectionName } from '../constants/index.mjs';

const peopleCollection = collectionName.people;

export const up = async (db, client) => {
  await db
    .collection(peopleCollection)
    .updateMany({ avatar: '' }, { $unset: { avatar: '' } });
  await db
    .collection(peopleCollection)
    .updateMany({ website: '' }, { $unset: { website: '' } });
};

export const down = async (db, client) => {
  await db
    .collection(peopleCollection)
    .updateMany({ avatar: '' }, { $set: { avatar: '' } });
  await db
    .collection(peopleCollection)
    .updateMany({ website: '' }, { $set: { website: '' } });
};
