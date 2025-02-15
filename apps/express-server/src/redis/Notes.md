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
| `EXPIRE` | Automatically remove a key after a specified duration in seconds. |

### List
| Command | Description |
|-|-|
| `LPUSH` | Append element to the starting of the list |
| `RPOP` | Remove element from the end of the list |
| `LLEN` | Returns length of the list |
| `LRANGE` | Returns elements from start to end index, both inclusive |
| `LINDEX` | Returns element at the specified index |
| `LTRIM` | Mutate list from start to end index, both inclusive |

For more details on lists, refer the [Redis Lists documentation](https://redis.io/docs/latest/develop/data-types/lists/) and the complete list of [list related commands](https://redis.io/docs/latest/commands/?group=list).

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
| `SUNION` | Combine 2 or more sets |
| `SINTER` | Intersection of 2 or more sets |
| `SDIFF` | Get elements of 1st set that are not present on 1 or more sets |

For more details on sets, refer the [Redis Sets documentation](https://redis.io/docs/latest/develop/data-types/sets/) and the complete list of [set related commands](https://redis.io/docs/latest/commands/?group=set).

### Hash

| Command | Description |
|-|-|
| `HSET` | Add key-values to a hash like `HSET person:1 name "joe jonas" age 34 email "joe@we.we"` |
| `HGET` | Get value of a field in hash. `HGET person:1 name` |
| `HMGET` | Get values for multiple fields in a hash |
| `HGETALL` | Retrieve all fields and values in a hash |
| `HINCRBY` | Increments value of a field, works only for integer `HINCRBY person:1 age 3` |
| `HINCRBYFLOAT` | Increments value of floating values for a field |
| `HLEN` | Returns the number of fields contained in the hash stored at key |

For more details on hashes, refer the [Redis Hashes documentation](https://redis.io/docs/latest/develop/data-types/hashes/) and the complete list of [hash related commands](https://redis.io/docs/latest/commands/?group=hash).

### Sorted Set

| Command | Description |
|-|-|
| `ZADD` | Adds multiple elements to a sorted set by score. `ZADD rating 4.35 joe 3.25 "super man"` |
| `ZSCORE` | Returns score of a key. `ZSCORE rating joe` |
| `ZCARD` | Returns size of the sorted-set |
| `ZRANK` | Returns position of an element in a sorted set, positions start from 0 onwards |
| `ZREVRANK` | Returns the rank of the provided member, assuming the sorted set is in descending order, starts from 0 |
| `ZRANGE` | Returns elements specified by position. Use `WITHSCORES` at the end to get scores as well. `ZRANGE rating 3 5 BYSCORE` returns keys that have rating in this range |
`ZRANGEBYSCORE` | Get all fields between specified scores. `ZRANGEBYSCORE rating 3 4.5` |
| `ZUNION` | Union of sorted sets |
| `ZREM` | Removes element by field |
| `ZINCRBY` | Increments score of a key by the specified value. `ZINCRBY rating 1.2 joe` |

For more details on sorted-sets, refer the [Redis Sorted-Sets documentation](https://redis.io/docs/latest/develop/data-types/sorted-sets/) and the complete list of [hash related commands](https://redis.io/docs/latest/commands/?group=sorted-set).

## Notes

1. Keys are case-insensitive. Both "color" and "Color" keys can exist with different values.

2. Push commands return the new length of the list whereas the pop commands return the removed element from the list.

3. Range of a list start from 0 till `length-1`. From the end, it starts from -1 onwards. If you want to get elements from an index _i_ onwards till the end, use `LRANGE key i -1`. The `GET` command won't work for a list. To get all the elements, use `LRANGE <key> 0 -1`. 

4. Both `DEL` and `UNLINK` are used to remove keys from Redis, but `DEL` is synchronous and blocks Redis until deletion completes, making it slower for large datasets. `UNLINK` is	asynchronous	and removes keys in the background.

5. Redis hashes do not support nested key-value structures directly. Unlike JavaScript objects, where you can have deeply nested properties, Redis hashes only store flat key-value pairs where both keys and values are strings. If you need to store nested data, serialize the nested object into a JSON string before storing it. You can use Namespaced Keys, ie, instead of nesting, store related data as separate hash keys. eg:

```
HSET user:1 name "Alice" age "25"
HSET user:1:address city "NY" zip "10001"
```

Else the best option is to use RedisJSON module that allows native JSON support in Redis.

6. Floating-point precision issues are normal. Say if do `HINCRBYFLOAT` for 12.452 by 3, it gives me 15.45199999999999996. So the best option is to avoid storing float values, esp for currencies to avoid precision loss.

7. Redis does not support expiring individual fields inside a hash. You need to store expiry timestamp in the hash and check before use. Else instead of using a hash, store each field as a separate key with EXPIRE:

```
SET user:123:name "John"
EXPIRE user:123:name 60  # This expires in 60 seconds

SET user:123:age "30"
EXPIRE user:123:age 120  # This expires in 120 seconds
```

8. `ZRANGEBYLEX` is used in Redis Sorted Sets (ZSET) to fetch elements in lexicographical order when all elements have the same score.

```
ZADD myset 0 apple 0 banana 0 cherry 0 date 0 grape 0 mango 0 orange 0 peach

// Returns: All elements sorted by name
ZRANGEBYLEX myset - +

// Returns: First 3 Elements
ZRANGEBYLEX myset - + LIMIT 0 3

// Returns: "cherry", "date", "grape", "mango"
ZRANGEBYLEX myset [c [m
```

- `-` → Represents lowest lexicographical value.
- `+` → Represents highest lexicographical value.
- `[` → Inclusive
- `(` → Exclusive