# GraphQL

1.  GraphQL has the following default Scalar types:
    - `Int`: A signed 32‐bit integer.
    - `Float`: A signed double-precision floating-point value.
    - `String`: A UTF‐8 character sequence.
    - `Boolean`: true or false.
    - `ID`: A unique identifier, serialized in the same way as a `String`

		Other Types includes
		- `scalar Date`
		- ENUM
		  ```
		  enum Episode {
        NEWHOPE
        EMPIRE
        JEDI
      }
			```
    
    For using other scalers or creating your own customer scalar, use [graphql-scalars](https://the-guild.dev/graphql/scalars), define your [own scalar](https://www.apollographql.com/docs/apollo-server/schema/custom-scalars).  

2.  Adding `#graphql` to the beginning of a template literal provides GraphQL syntax highlighting in supporting IDEs.

3.  Refer [this article](https://www.apollographql.com/docs/apollo-server/workflow/generate-types) to use **Graphql with Typescript**. Generate types from a GraphQL schema using `graphql-codegen`.

4. When extending an interface, you must explicitly specify all the fields from the interface in your type even as GraphQL does not automatically inherit fields from an interface like some programming languages (e.g., TypeScript or Java).

5. Explicitly define the union types, esp when returning the response from a query or a mutation.

    ```
    union AdminOrCustomer = Admin | Customer

    type Query {
      getUserById(id: ObjectID!): Admin | Customer    ❌
      getUserById(id: ObjectID!): AdminOrCustomer     ✅
    }
    ```` 

6. **Query fields are executed in parallel, mutation fields run in series**, so that the first is guaranteed to finish before the second begins, ensuring that we don’t end up in a race condition with ourselves.

7.  For returning response for a mutation,

    ```
    type Mutation {
      placeOrder(input: OrderInput!): Order
    }
    ```

    - Use Order (nullable) if you want to return `null` during an error scenario, be it validation or an exception.
    - Use Order! (non-nullable) if you always expect a valid order or want to force error handling via GraphQL errors.

  If you're using GraphQL best practices, it's better to use `Order!` and handle errors explicitly.

8. The server should handle user authentication before a GraphQL request is validated; authorization should happen within your business logic during GraphQL request execution.

9. GraphQL requests are sent using the `POST` HTTP method, but query operations may also be sent using the `GET` method. Clients should also provide a `Content-type` header with a value of `application/json` for POST requests.

10. Querying for `__typename` is almost always recommended, but it's even more important when querying a field that might return one of multiple types.

11. Read more on the [Resolver arguments](https://www.apollographql.com/docs/apollo-server/data/resolvers#resolver-arguments).

12. For queries involving multiple levels of nesting, use [graphql-depth-limit](https://www.npmjs.com/package/graphql-depth-limit) package to limit querying upto a certain depth and prevent infinite recursion.

13. During a GraphQL operation, you can share data throughout your server's resolvers and plugins by creating an object named `contextValue.`You can pass useful things through your contextValue that any resolver might need, like authentication scope, sources for fetching data, database connections, and custom fetch functions.

14. You need to manually copy `.graphql` or `.gql` files in the build folders as typescript does not handle it. Below is the build script of the `graphql-server` workspace:

    ```
    "build": "yarn run codegen && tsc && tsc-alias && cp -R ./src/schema/*.graphql ./dist/schema",
    ```