/* https://www.npmjs.com/package/@aws-sdk/client-s3 */
import {
  S3Client,
  ListBucketsCommand,
  ListBucketsCommandInput
} from '@aws-sdk/client-s3';
import { winstonLogger } from '@/middleware';
import { printObject } from '@/utils';

export const s3Client = new S3Client();

export async function listBucketObjects() {
  try {
    const input: ListBucketsCommandInput = {
      MaxBuckets: 1,
      // ContinuationToken: "STRING_VALUE",
      // Prefix: "STRING_VALUE",
      // BucketRegion: "STRING_VALUE",
    };
    const command = new ListBucketsCommand(input);
    const result = await s3Client.send(command);
    winstonLogger.info(`S3 Buckets List: ${printObject(result)}`);
  } catch(err) {
    winstonLogger.error('Error listing bucket objects: ', err);
  }
}
