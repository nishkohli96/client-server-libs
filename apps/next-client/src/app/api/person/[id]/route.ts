import { NextRequest, NextResponse } from 'next/server';
import { Types } from 'mongoose';
import { PersonModel } from '@csl/mongo-models';
import mongoDB from '@/mongoDB';

type RequestParams = {
  params: Promise<{ id: string }>;
};

/**
 * @param request - Request Object
 * @param param1 - Request Params
 */
export async function GET(request: NextRequest, { params }: RequestParams) {
  const { id } = await params;
  try {
    await mongoDB.connect();
    const personDetails = await PersonModel.findOne({
      _id: new Types.ObjectId(id)
    });
    return NextResponse.json(personDetails);
  } catch (error) {
    console.log('error: ', error);
    return NextResponse.json({ message: 'Something went wrong!' });
  }
}
