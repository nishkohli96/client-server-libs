# mongo-seeders

PoC to seed records in MongoDB. Use [migrate-mongo](https://www.npmjs.com/package/migrate-mongo) to modify existing records.

### Usage
Seed the database.
```
yarn seed
```

This will perform the following tasks -
- Clear data from all collections, including previously applied migrations. 
- Insert records in `Airports` collection from [airport.json](./src/data/airport.json).
- Read records from [people.csv](./src/data/people.csv) and insert them in `People` collection.
- Run the following migration scripts:
  - Add `profession` field for each record using [faker-js](https://www.npmjs.com/package/@faker-js/faker)
	- Remove `avatar` and `website` fields from records with blank values.
	- Change person avatar src from random images at [https://dummyimage.com/](https://dummyimage.com/) to [https://randomuser.me/](https://randomuser.me/).

To only insert data in DB without running any migrations,
```
yarn seed:db
```
