# Migration Commands

**This doc contains notes on [Sequelize Migrations](https://sequelize.org/docs/v6/other-topics/migrations/)**

1. Connect to the DB via shell using:
```
psql -h your_host -U your_user -d your_database -p your_port
```

2. Install the Sequelize CLI
```
npm install --save-dev sequelize-cli
```

3. Create an empty project & run the below command to create `config`, `models`, `migrations` and `seeders` folders.
```
npx sequelize-cli init
```

4. Update `config.json` file with the respective db credentials for each environment. The keys of the objects matches the `process.env.NODE_ENV` values.

5. Creating model (and migration).
```
npx sequelize-cli model:generate --name User --attributes firstName:string,lastName:string,email:string
```

6. Run the migration using
```
NODE_ENV=production npx sequelize-cli db:migrate
```

To undo the most recent migration, run
```
npx sequelize-cli db:migrate:undo
```

7. Generate Seeder files using:
```
npx sequelize-cli seed:generate --name demo-user
```
Run seeders:
```
npx sequelize-cli db:seed:all
```