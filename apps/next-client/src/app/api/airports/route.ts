import { type NextRequest, NextResponse } from 'next/server';
import { AirportModel } from '@csl/mongo-models';
import mongoDB from '@/mongoDB';
import { logApiError } from '@/utils';

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const queryParams = Object.fromEntries(searchParams.entries());
  const { page, limit } = queryParams ?? {};
  const pageNum = page ? Number(page) : 1;
  const recordsPerPage = limit ? Number(limit) : 10;

  try {
    await mongoDB.connect();
    const allData = await AirportModel.find()
      .skip((pageNum - 1) * recordsPerPage)
      .limit(recordsPerPage);
    return NextResponse.json(allData);
  } catch (error) {
    logApiError(error, request);
    return NextResponse.json({
      message: 'Something went wrong!',
      error: error instanceof Error ? error.message : JSON.stringify(error)
    });
  }
}
