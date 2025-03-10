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
    
    For using other scalers or creating your own customer scalar, use [graphql-scalars](https://the-guild.dev/graphql/scalars).

2.  Adding `#graphql` to the beginning of a template literal provides GraphQL syntax highlighting in supporting IDEs.

3.  Refer [this article](https://www.apollographql.com/docs/apollo-server/workflow/generate-types) to use Graphql with Typescript. The server must be running to generate types using `graphql-codegen`.

4. When extending an interface, you must explicitly specify all the fields from the interface in your type even as GraphQL does not automatically inherit fields from an interface like some programming languages (e.g., TypeScript or Java).

