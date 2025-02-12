# MySQL Commands

1. Connect to DB using the below command. If I don't add `-p` flag at end, it denies me the access.   

mysql -h hostname -u root -P port -p

2. Install MySQL on mac using `homebrew`. By default it sets up a user __root__ with no password. To set up password for this user, run:

```
mysql_secure_installation
``` 

3. Connect to the local DB using,
```
mysql -u root -p
```

4. Commands:

| Command |	Description |
|-|-|
| SHOW DATABASES; |	List all databases |
| USE my_database; |	Select a database |
| SHOW TABLES; | List all tables in the selected database |
| DESCRIBE users; |	Show table structure (columns & types) |
