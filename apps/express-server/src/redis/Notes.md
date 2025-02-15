# Redis

## Redis Commands

### Strings
| Command | Description |
|-|-|
| `SET` | Assign a new value or overwrite value for a key |
| `GET` | Retrieve value for a key |
| `UNLINK` | Remove a key |
| `TYPE` | Returns data type of the key |
| `EXISTS` | Returns 1 if key is present, else 0 |

### List
| Command | Description |
|-|-|
| `LPUSH` | Append element to the starting of the list |
| `RPOP` | Remove element from the end of the list |
| `LLEN` | Returns length of the list |
| `LRANGE` | Returns elements from start to end index, both inclusive |
| `LINDEX` | Returns element at the specified index |
| `LTRIM` | Mutate list from start to end index, both inclusive |

### Set
| Command | Description |
|-|-|
| `SADD` | Add element(s) to a set |
| `SREM` | Remove element(s) from a set |
| `SMEMBERS` | Get all members of a set |
| `SISMEMBER` | Check if a Value Exists in a Set |
| `SRANDMEMBER` | Get random element(s) from a set. Returns n number of random elements if n is specified after the key name, else it returns only a single element |
| `SPOP` | Removes a random element from the set and returns it |
| `SCARD` | Returns length of the set | 

## Notes

1. Keys are case-insensitive. Both "color" and "Color" keys can exist with different values.

2. Push commands return the new length of the list whereas the pop commands return the removed element from the list.

3. Range of a list start from 0 till `length-1`. From the end, it starts from -1 onwards. If you want to get elements from an index _i_ onwards till the end, use `LRANGE key i -1`. The `GET` command won't work for a list. To get all the elements, use `LRANGE <key> 0 -1`. 

4. Both `DEL` and `UNLINK` are used to remove keys from Redis, but `DEL` is synchronous and blocks Redis until deletion completes, making it slower for large datasets. `UNLINK` is	asynchronous	and removes keys in the background.

5. Sets are unordered collection of unique elements.
## Links

| Name | Links |
|-|-|
| **Lists** | [Docs](https://redis.io/docs/latest/develop/data-types/lists/), [Commands](https://redis.io/docs/latest/commands/?group=list) | 