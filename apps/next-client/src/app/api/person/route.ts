import { NextResponse } from 'next/server';
import { PersonModel } from '@csl/mongo-models';
import mongoDB from '@/mongoDB';

export async function GET() {
  try {
    await mongoDB.connectToDB();
    const records = await PersonModel.find().limit(10);
    console.log('records: ', records);

    return NextResponse.json({
      success: true,
      data: records,
      status: 200
    });
  } catch (error) {
    console.error('Error fetching records:', error);
    return NextResponse.json({
      success: false,
      message: JSON.stringify(error) || 'An error occurred',
      status: 500
    });
  } finally {
    // Disconnect only in production
    if (process.env.NODE_ENV === 'production') {
      await mongoDB.disconnectDB();
    }
  }
}
