import { connect, disconnect } from 'mongoose';
import { ENV_VARS } from '@/app-constants';

let connection: any = null;

export async function connectToDB() {
  try {
    if(connection) {
      console.log('already connected to db');
      return;
    }
    connection = await connect(`${ENV_VARS.mongo.url}/${ENV_VARS.mongo.dbName}`);
    console.log('connected to db');
  } catch (err) {
    console.log('err: ', err);
  }
}

// class MongoServer {
//   private url: string;
//   private dbName: string;

//   constructor() {
//     this.url = ENV_VARS.mongo.url;
//     this.dbName = ENV_VARS.mongo.dbName;
//   }

//   async connectToDB() {
//     try {
//       await connect(`${this.url}/${this.dbName}`);
//       console.log(
//         '`${this.url}/${this.dbName}`: ',
//         `${this.url}/${this.dbName}`
//       );
//     } catch (err) {
//       console.log('err: ', err);
//     }
//   }

//   async disconnectDB() {
//     try {
//       await disconnect();
//     } catch (err) {
//       console.log('err: ', err);
//     }
//   }
// }

// export default new MongoServer();
