import {
  S3Client,
  ListBucketsCommand,
} from '@aws-sdk/client-s3';
import { winstonLogger } from '@/middleware';

export const s3Client = new S3Client();

export function listBucketObjects() {
  try {
    const ty = 3;
  } catch(err) {
    winstonLogger.error('Error listing bucket objects: ', err);
  }
}
