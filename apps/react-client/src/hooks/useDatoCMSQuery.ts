import { useState, useEffect } from 'react';
import { datoCMSApi } from 'api';

type QueryResult<T> = T | null;

/**
 * DatoCMS GraphQL queries are returning the requested
 * info under the "data" key
 */
type GraphQueryResponse<T> = { data: T };

export default function useDatoCMSQuery<T>(query: string): QueryResult<T> {
  const [result, setResult] = useState<QueryResult<T>>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await datoCMSApi.post<object, GraphQueryResponse<T>>(
          '',
          { query }
        );
        setResult(response.data);
      } catch (err) {
        console.log(err);
      }
    }

    fetchData();
  }, [query]);

  return result;
}
