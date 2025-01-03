import { cookies, headers } from 'next/headers';

/* For Next 15, both cookies and headers require await. */
export function GET() {
  const cookieStore = cookies();
  const token = cookieStore.get('token');
  // Returns "undefined" if the cookie is not found
  console.log('token: ', token);

  const headersList = headers();
  const referer = headersList.get('12232referer122');
  // Returns "null" for missing headers
  console.log('referer: ', referer);

  const data = {
    foo: 'bar'
  };
  return Response.json({ data });
}

export async function POST(request: Request) {
  const body = await request.json();
  /**
   * Similarly for formData,
   *
   * const formData = await request.formData();
   * const name = formData.get('name');
   */
  return Response.json({ reqBody: body });
}
