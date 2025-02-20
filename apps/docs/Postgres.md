# PostgreSQL

1.  **Connect to the DB via shell using:**
    ```
    psql -h your_host -U your_user -d your_database -p your_port
    ```

2.  **Case Sensitivity of table names:**

    PostgreSQL automatically converts unquoted table names to lowercase → `sequelizemeta`. If the table was originally created as "SequelizeMeta", PostgreSQL does not find sequelizemeta, causing an error. Thus `DROP TABLE "SequelizeMeta";` will work but `DROP TABLE SequelizeMeta;` will throw an error as table `sequelizemeta` does not exist.

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
