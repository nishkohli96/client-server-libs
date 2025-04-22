# MySQL Commands

## Installation on Mac

Install [MySQL](https://www.mysql.com/) on mac using [homebrew](https://brew.sh/). By default it sets up a user __root__ with no password. To set up password for this user, run:

```
mysql_secure_installation
```

## Connection

Connect to DB using the below command. If I don't add `-p` flag at end, it denies me the access.   

```
mysql -h hostname -u root -P port -p
```

Connect to the local DB using,
```
mysql -u root -p
```

## Commands

| Command |	Description |
|-|-|
| `SHOW DATABASES;` |	List all databases |
| `USE my_database;` |	Select a database |
| `SHOW TABLES;` | List all tables in the selected database |
| `DESCRIBE users;` |	Show table structure (columns & types) |
