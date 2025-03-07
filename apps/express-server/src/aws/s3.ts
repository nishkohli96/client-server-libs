/* https://www.npmjs.com/package/@aws-sdk/client-s3 */
import { S3Client } from '@aws-sdk/client-s3';
import { winstonLogger } from '@/middleware';
import { printObject, listS3Buckets } from '@/utils';

export const s3Client = new S3Client();

export async function listBucketObjects() {
  try {
    const buckets = await listS3Buckets([]);
    winstonLogger.info(`S3 Bucket List: ${printObject(buckets)}`);
  } catch(err) {
    winstonLogger.error('Error listing bucket objects: ', err);
  }
}
