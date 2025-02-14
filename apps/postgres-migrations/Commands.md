# Migration Commands

**This doc contains notes on [Sequelize Migrations](https://sequelize.org/docs/v6/other-topics/migrations/)**

1.  Connect to the DB via shell using:
    ```
    psql -h your_host -U your_user -d your_database -p your_port
    ```

2.  Install the Sequelize CLI
    ```
    npm install --save-dev sequelize-cli
    ```

3.  Create an empty project & run the below command to create `config`, `models`, `migrations` and `seeders` folders.
    ```
    npx sequelize-cli init
    ```

4.  Update `config.json` file with the respective db credentials for each environment. The keys of the objects matches the `process.env.NODE_ENV` values.

5.  Creating model (and migration).
    ```
    npx sequelize-cli model:generate --name User --attributes firstName:string,lastName:string,email:string
    ```

6.  Run the migration using
    ```
    NODE_ENV=production npx sequelize-cli db:migrate
    ```

    To undo the most recent migration, run
    ```
    npx sequelize-cli db:migrate:undo
    ```

7.  Generate Seeder files using:
    ```
    npx sequelize-cli seed:generate --name demo-user
    ```

    Run All seeders:
    ```
    npx sequelize-cli db:seed:all
    ```

    Run a specific seeder:
    ```
    npx sequelize-cli db:seed --seed 20250211224419-cars-list
    ```
    Unlike migrations, the Seeder execution history is not stored anywhere.

8.  Undo Seeders
    ```
    npx sequelize-cli db:seed:undo --seed name-of-seed-as-in-data
    ```
    If the seeder name is not provided, the last applied seeder will be reverted.

9.  Case Sensitivity of table names.
    PostgreSQL automatically converts unquoted table names to lowercase → `sequelizemeta`. If the table was originally created as "SequelizeMeta", PostgreSQL does not find sequelizemeta, causing an error. Thus `DROP TABLE "SequelizeMeta";` will work but `DROP TABLE SequelizeMeta;` will throw an error as table `sequelizemeta` does not exist.

10. Generate new migation file:
    ```
    NAME=migrationName yarn new-migration
    ```

11. You can also [configure a custom js file](https://sequelize.org/docs/v6/other-topics/migrations/#the-sequelizerc-file) instead of the default [config.json](./config/config_sample.json) file to define database connection settings.

## Database Commands

| Command |	Description |
|-|-|
| `\l` | List all databases |
| `\c db_name` | Switch to the specified database, else gives the db_name currently connected  |
| `\dt` |	List all tables in the current database |
| `\d table_name` |	Show table structure (Columns, Data Types, Indexes & References) |
| `\ds` | View all sequences in your database |
| `SELECT * FROM car_brands_id_seq;` | Check the sequence details |
| `SELECT nextval('car_brands_id_seq');` | See the next value the sequence will generate |
| `SELECT currval('car_brands_id_seq');` | See the current value (last assigned id) |
| `ALTER SEQUENCE car_brands_id_seq RESTART WITH 1;` | Reset the sequence (Use with caution) |

