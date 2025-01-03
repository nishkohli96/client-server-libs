import mongoose from 'mongoose';
import { ENV_VARS } from '@/app-constants';

class MongoDB {
  private connection: typeof mongoose | null = null;

  async connect() {
    if(this.connection) {
      console.log('Reusing existing connection');
      return;
    }
    try {
      this.connection = await mongoose.connect(`${ENV_VARS.mongo.url}/${ENV_VARS.mongo.dbName}`);
    } catch (err) {
      console.log('err: ', err);
    }
  }

  async disconnect() {
    try {
      await mongoose.disconnect();
    } catch (err) {
      console.log('err: ', err);
    }
  }
}

const mongoDB = new MongoDB();
export default mongoDB;
