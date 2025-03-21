import { cookies, headers } from 'next/headers';

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get('token');
  // Returns "undefined" if the cookie is not found
  console.log('token: ', token);

  const headersList = await headers();
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
