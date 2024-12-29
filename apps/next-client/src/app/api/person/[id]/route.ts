import { NextRequest, NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';
import { Types } from 'mongoose';

type RequestParams = {
  params: { id: string };
}

/**
 * @param request - Request Object
 * @param param1 - Request Params
 */
export async function GET(request: NextRequest, { params }: RequestParams) {
  const { id } = params;
  console.log('id: ', id);
  const client = new MongoClient(
    'mongodb://localhost:27017'
  );

  try {
    await client.connect();
    const database = client.db('SeederDB');
    const collection = database.collection('People');
    const allData = await collection.findOne({ _id: new Types.ObjectId(id) });

    return NextResponse.json(allData);
  } catch (error) {
    console.log('error: ', error);
    return NextResponse.json({ message: 'Something went wrong!' });
  } finally {
    await client.close();
  }
}
