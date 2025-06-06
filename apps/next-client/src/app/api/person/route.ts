import { type NextRequest, NextResponse } from 'next/server';
import { PersonModel } from '@csl/mongo-models';
import mongoDB from '@/mongoDB';

export async function GET(request: NextRequest) {
  /**
   * Get all the searchParams from the URL. However, if any
   * key of queryParams supports multiple values, then
   * searchParams.getAll('key') is recommended. As always,
   * don't forget to convert the values of searchParams from
   * string to number, if required.
   *
   * const { searchParams } = new URL(request.url);
   *
   * request.nextUrl.pathname will give the pathname, in this
   * case it will be "/api/person".
   */

  const { searchParams } = request.nextUrl;
  const queryParams = Object.fromEntries(searchParams.entries());
  const { page, limit } = queryParams ?? {};
  const pageNum = page ? Number(page) : 1;
  const recordsPerPage = limit ? Number(limit) : 10;

  try {
    await mongoDB.connect();
    const allData = await PersonModel.find()
      .skip((pageNum - 1) * recordsPerPage)
      .limit(recordsPerPage);

    return NextResponse.json(allData);
  } catch (error) {
    return NextResponse.json({
      message: 'Something went wrong!',
      error: error instanceof Error ? error.message : JSON.stringify(error)
    });
  }
}
