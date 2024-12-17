/**
 * For records who have a valid avatar image, update image url from
 * the ones from https://randomuser.me/.
 *
 * For MALE, OTHERS the updated image would be like,
 * https://randomuser.me/api/portraits/men/{index}.jpg
 *
 * For FEMALE, it would be
 * https://randomuser.me/api/portraits/women/{index}.jpg
 *
 * where 0 <= index <= 99
 */
import mongoModels from '@csl/mongo-models';

const peopleCollection = mongoModels.collectionNames.people;
const startIndex = 0;
const endIndex = 99;

const generateRandomIndex = () => {
  return Math.floor(Math.random() * (endIndex - startIndex + 1)) + startIndex;
};

const getAvatarUrl = (gender, index) => {
  const genderPath = gender === 'FEMALE' ? 'women' : 'men';
  return `https://randomuser.me/api/portraits/${genderPath}/${index}.jpg`;
};

export const up = async (db) => {
  const peopleWithAvatar = await db
    .collection(peopleCollection)
    .find({ avatar: { $exists: true, $ne: '' } })
    .toArray();

  const bulkOps = peopleWithAvatar.map(person => {
    const index = generateRandomIndex();
    const updatedAvatar = getAvatarUrl(person.gender, index);
    return {
      updateOne: {
        filter: { _id: person._id },
        update: { $set: { avatar: updatedAvatar } }
      }
    };
  });
  if (bulkOps.length > 0) {
    await db.collection(peopleCollection).bulkWrite(bulkOps);
  }
};

/**
 * For down seeder, write some custom logic to reset images
 * for each user to a random image from https://dummyimage.com/
 *
 * Previous images were of the form -
 * http://dummyimage.com/147x100.png/ff4444/ffffff
 */
export const down = async (db) => {
  await db
    .collection(peopleCollection)
    .updateMany(
      { avatar: { $exists: true, $ne: '' } },
      { $set: { avatar: 'https://dummyimage.com/250/ffffff/000000' } }
    );
};
