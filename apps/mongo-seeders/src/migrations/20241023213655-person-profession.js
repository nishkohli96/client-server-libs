const { faker } = require('@faker-js/faker');

function getPersonJob() {
  return faker.person.jobTitle();
}

module.exports = {
  async up(db, client) {
    const persons = await db.collection('Person').find({}).toArray();

    const operations = persons.map((person) => ({
      updateOne: {
        filter: { _id: person._id },
        update: { $set: { profession: getPersonJob() } },
      },
    }));

    if (operations.length > 0) {
      await db.collection('Person').bulkWrite(operations);
    }
  },

  async down(db, client) {
    await db.collection('Person').updateMany({}, { $unset: { profession: '' } });
  }
};
