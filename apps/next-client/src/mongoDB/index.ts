import { connect, disconnect } from 'mongoose';
import { ENV_VARS } from '@/app-constants';

class MongoServer {
  private url: string;
  private dbName: string;

  constructor() {
    this.url = ENV_VARS.mongo.url;
    this.dbName = ENV_VARS.mongo.dbName;
  }

  async connectToDB() {
    try {
      await connect(`${this.url}/${this.dbName}`);
      console.log(
        '`${this.url}/${this.dbName}`: ',
        `${this.url}/${this.dbName}`
      );
    } catch (err) {
      console.log('err: ', err);
    }
  }

  async disconnectDB() {
    try {
      await disconnect();
    } catch (err) {
      console.log('err: ', err);
    }
  }
}

export default new MongoServer();
