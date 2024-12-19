
import { NextRequest, NextResponse } from 'next/server';

function generateQueryParamsObject(
  urlSearchParams: URLSearchParams
): Record<string, string | string[]> {
  const queryParamsObject: Record<string, string | string[]> = {};

  urlSearchParams.forEach((value, key) => {
    /**
		 * If the key already exists, convert the value to an array
		 * (or append to the array)
		 */
    if (Object.hasOwn(queryParamsObject, key)) {
      /* If it's already an array, push the new value */
      if (Array.isArray(queryParamsObject[key])) {
        (queryParamsObject[key] as string[]).push(value);
      } else {
        /**
				 * If it's not an array, convert the previous value into an array
				 * and add the new value
				 */
        queryParamsObject[key] = [queryParamsObject[key] as string, value];
      }
    } else {
      queryParamsObject[key] = value;
    }
  });

  return queryParamsObject;
}

/**
 * Test Route -
 * http://localhost:3001/api/user/er?age=18&color=blue&color=red&hidden=true
 */
export function GET(
  req: NextRequest,
  { params }: { params: { name: string } }
) {
  // Get the dynamic 'name' parameter from the URL
  const name = req.nextUrl.pathname.split('/').pop();

  /**
	 * Another way to get request params. For Next 15, use
	 * await to get the value of this object.
	 */
  console.log('params: ', params);

  /**
   * queryParams.get('color') will return only the first value of the color
   * query parameter, whereas queryParams.getAll('color') will return all the
   * values of the color query parameter.
   *
   * For a non existent query parameter, queryParams.get('sth') will return null,
   * and will return an empty array for queryParams.getAll('sth').
   *
   * queryParams.toString() returns the below result:
   * -> age=18&color=blue&color=red&hidden=true
   */
  const queryParams = req.nextUrl.searchParams;

  return NextResponse.json({
    params: { name },
    queryParams: generateQueryParamsObject(queryParams)
  });
}
