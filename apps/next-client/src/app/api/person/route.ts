import { NextRequest, NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';
import { ENV_VARS } from '@/app-constants';
import mongoServer from '@/mongoDB';
import { PersonModel } from '@csl/mongo-models';

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

  // const client = new MongoClient(
  //   'mongodb://localhost:27017'
  //   // `mongodb+srv://nish1896:dragon123Nish@cluster0.tlouv.mongodb.net`
  // );

  try {
    // await client.connect();
    // const database = client.db('SeederDB'); // `e-commerce`);
    // const collection = database.collection('People'); // 'groceries');
    // const allData = await collection
    //   .find()
    //   .skip((pageNum - 1) * recordsPerPage)
    //   .limit(recordsPerPage)
    //   .toArray();
    await mongoServer.connectToDB();
    const allData = await PersonModel.find()
      .skip((pageNum - 1) * recordsPerPage)
      .limit(recordsPerPage);

    return NextResponse.json(allData);
  } catch (error) {
    return NextResponse.json({ message: 'Something went wrong!' });
  } finally {
    await mongoServer.disconnectDB();
  }
}
