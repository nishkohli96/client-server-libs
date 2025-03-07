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
import csvParser from 'csv-parser';
import { ENV_VARS } from '@/app-constants';
import { winstonLogger } from '@/middleware';
import {
  printObject,
  listS3Buckets,
  listS3BucketObjects
} from '@/utils';
import { Readable } from 'stream';

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
export async function checkIfObjectExist(
  bucketName: string,
  key: string
) {
  try {
    const input: HeadObjectCommandInput = {
      Bucket: bucketName,
      Key: key,
    };
    const command = new HeadObjectCommand(input);
    const response = await s3Client.send(command);
    winstonLogger.info(`S3 Bucket List: ${printObject(response)}`);
  } catch (err) {
    winstonLogger.error('Error checking if object exist in bucket: ', err);
  }
}

export async function getBucketObjects(bucketName: string) {
  try {
    const bucketObjects = await listS3BucketObjects(bucketName);
    winstonLogger.info(`S3 Bucket Objects: ${printObject(bucketObjects)}`);
  } catch (err) {
    winstonLogger.error('Error listing bucket objects: ', err);
  }
}

/**
 * This function reads a csv file from the bucket and returns the
 * entries as an array of objects.
 */
export async function readCsvFromS3<T>(
  bucket: string,
  key: string
): Promise<T[]> {
  const records: T[] = [];
  const command = new GetObjectCommand({
    Bucket: bucket,
    Key: key
  });

  try {
    const response = await s3Client.send(command);
    if (!response.Body) {
      winstonLogger.error(`No body received from S3 for key: "${key}"`);
      return [];
    }

    return new Promise((resolve, reject) => {
      const readableStream = response.Body as Readable;
      readableStream.pipe(csvParser())
        .on('data', (row: T) => {
          records.push(row);
        })
        .on('end', () => {
          winstonLogger.info(`CSV records fetch from file: ${printObject(records)}`);
          resolve(records);
        })
        .on('error', error => {
          winstonLogger.error('Error reading or parsing CSV:', error);
          reject([]);
        });
    });
  } catch (error) {
    winstonLogger.error('Error fetching CSV:', error);
    throw error;
  }
}

/**
 *
 * @param bucketName: Name of S3 bucket
 * @param key Eg: pic.png
 */
export async function deleteObject(
  bucketName: string,
  key: string
) {
  try {
    const input: DeleteObjectCommandInput = {
      Bucket: bucketName,
      Key: key,
    };
    const command = new DeleteObjectCommand(input);
    const response = await s3Client.send(command);
    winstonLogger.info(`Bucket Object Deleted: ${printObject(response)}`);
  } catch (err) {
    winstonLogger.error('Error deleting Object from Bucket: ', err);
  }
}

export async function deleteBucket(bucketName: string) {
  try {
    const input: DeleteBucketCommandInput = {
      Bucket: bucketName
    };
    const command = new DeleteBucketCommand(input);
    const response = await s3Client.send(command);
    winstonLogger.info(`S3 Bucket Deleted: ${printObject(response)}`);
  } catch (err) {
    winstonLogger.error('Error deleting S3 Bucket: ', err);
  }
}
