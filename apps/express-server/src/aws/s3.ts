/* https://www.npmjs.com/package/@aws-sdk/client-s3 */

import {
  S3Client,
  HeadObjectCommand,
  HeadObjectCommandInput,
  GetObjectCommand,
  GetObjectCommandInput,
  ListObjectsV2Command,
  ListObjectsV2CommandInput,
  DeleteObjectCommand,
  DeleteObjectCommandInput,
  DeleteBucketCommand,
  DeleteBucketCommandInput,
} from '@aws-sdk/client-s3';
import { ENV_VARS } from '@/app-constants';
import { winstonLogger } from '@/middleware';
import {
  printObject,
  listS3Buckets,
  listS3BucketObjects
} from '@/utils';

export const s3Client = new S3Client();

export async function getS3Buckets() {
  try {
    const buckets = await listS3Buckets();
    winstonLogger.info(`S3 Bucket List: ${printObject(buckets)}`);
  } catch (err) {
    winstonLogger.error('Error listing bucket objects: ', err);
  }
}

/**
 * The HEAD operation retrieves metadata from an object without
 * returning the object itself. This operation is useful if you're
 * interested only in an object's metadata.
 *
 * Upload products.csv from the assets folder in your S3 bucket to
 * test for yourself.
 */
export async function checkIfObjectExist() {
  try {
    const input: HeadObjectCommandInput = {
      Bucket: ENV_VARS.aws.s3BucketName,
      Key: 'sheets/products.csv',
    };
    const command = new HeadObjectCommand(input);
    const response = await s3Client.send(command);
    winstonLogger.info(`S3 Bucket List: ${printObject(response)}`);
  } catch (err) {
    winstonLogger.error('Error checking if object exist in bucket: ', err);
  }
}

export async function getBucketObjects() {
  try {
    const bucketObjects = await listS3BucketObjects();
    winstonLogger.info(`S3 Bucket Objects: ${printObject(bucketObjects)}`);
  } catch (err) {
    winstonLogger.error('Error listing bucket objects: ', err);
  }
}

export async function deleteObject() {
  try {
    const input: DeleteObjectCommandInput = {
      Bucket: ENV_VARS.aws.s3BucketName,
      Key: 'pic.png',
    };
    const command = new DeleteObjectCommand(input);
    const response = await s3Client.send(command);
    winstonLogger.info(`Bucket Object Deleted: ${printObject(response)}`);
  } catch (err) {
    winstonLogger.error('Error deleting Object from Bucket: ', err);
  }
}

export async function deleteBucket() {
  try {
    const input: DeleteBucketCommandInput = {
      Bucket: ENV_VARS.aws.s3BucketName
    };
    const command = new DeleteBucketCommand(input);
    const response = await s3Client.send(command);
    winstonLogger.info(`S3 Bucket Deleted: ${printObject(response)}`);
  } catch (err) {
    winstonLogger.error('Error deleting S3 Bucket: ', err);
  }
}
