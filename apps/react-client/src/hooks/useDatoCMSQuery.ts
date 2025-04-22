import { useState, useEffect } from 'react';
import { datoCMSApi } from 'api';

/**
 * DatoCMS GraphQL queries are returning the requested
 * info under the "data" key
 */
type GraphQueryResponse<T> = { data: T };

type QueryResult<T> = T | null;

type QueryResponse<T> = {
  data: T | null;
  isLoading: boolean;
};

export default function useDatoCMSQuery<T>(query: string): QueryResponse<T> {
  const [data, setData] = useState<QueryResult<T>>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      try {
        const response = await datoCMSApi.post<object, GraphQueryResponse<T>>(
          '',
          { query }
        );
        setData(response.data);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, [query]);

  return {
    data,
    isLoading
  };
}
