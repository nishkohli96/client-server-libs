# Migration Commands

**This doc contains notes on [Sequelize Migrations](https://sequelize.org/docs/v6/other-topics/migrations/)**

1.  Install the Sequelize CLI
    ```
    npm install --save-dev sequelize-cli
    ```

2.  Create an empty project & run the below command to create `config`, `models`, `migrations` and `seeders` folders.
    ```
    npx sequelize-cli init
    ```

3.  Update `config.json` file with the respective db credentials for each environment. The keys of the objects matches the `process.env.NODE_ENV` values.

4.  Creating model (and migration).
    ```
    npx sequelize-cli model:generate --name User --attributes firstName:string,lastName:string,email:string
    ```

5.  Run the migration using
    ```
    NODE_ENV=production npx sequelize-cli db:migrate
    ```

    To undo the most recent migration, run
    ```
    npx sequelize-cli db:migrate:undo
    ```

6.  Generate Seeder files using:
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

7.  Undo Seeders
    ```
    npx sequelize-cli db:seed:undo --seed name-of-seed-as-in-data
    ```
    If the seeder name is not provided, the last applied seeder will be reverted.

8. Generate new migation file:
    ```
    NAME=migrationName yarn new-migration
    ```

9. You can also [configure a custom js file](https://sequelize.org/docs/v6/other-topics/migrations/#the-sequelizerc-file) instead of the default [config.json](./config/config_sample.json) file to define database connection settings.

10. By default, Sequelize does not track the executed seeders. Thus you need to configure that in the `config.json`, using the available
storage options:

    | Option Name | Description |
    |-|-|
    | `none` (Default) | No tracking of executed seeders |
    | `json` | Stores executed seeders in a JSON file |
    | `sequelize` | Stores executed seeders in the database in a table (SequelizeData) |

    The snippet below defines how and where to store data of the applied [migrations](https://sequelize.org/docs/v6/other-topics/migrations/#migration-storage) and [seeders](https://sequelize.org/docs/v6/other-topics/migrations/#migration-storage).

    ```json
    {
      "development": {
        "migrationStorage": "json",
        "migrationStorageTableName": "SequelizeMigrations",
        "seederStorage": "sequelize",
        "seederStorageTableName": "SequelizeSeeders"
      }
    }
    ```

    Make sure to add `applied_at` column for the appropriate db tables to keep a track of the date when the last migration was applied or the data was seeded.

