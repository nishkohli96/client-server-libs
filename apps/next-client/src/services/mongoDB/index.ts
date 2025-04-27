import mongoose from 'mongoose';
import { ENV_VARS } from '@/constants';

class MongoDBService {
  private connection: typeof mongoose | null = null;

  /**
   * You should call mongoDBService.connect() inside each API route
   * or server action, but ensure it connects only once due to your
   * if (this.connection) guard.
   *
   * 🧠 Why this works:
   * - Mongoose handles connection pooling internally.
   * - Your MongoDBService ensures you don’t reconnect every time.
   * - Next.js APIs are serverless, so we can’t connect once globally,
   *   we connect per invocation, but guard against redundant calls.
   */
  async connect() {
    if (this.connection) {
      console.log('Reusing existing connection');
      return;
    }
    try {
      this.connection = await mongoose.connect(
        `${ENV_VARS.mongo.url}/${ENV_VARS.mongo.dbName}`
      );
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

const mongoDBService = new MongoDBService();
export default mongoDBService;
