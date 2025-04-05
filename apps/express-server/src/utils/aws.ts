import {
  type Bucket,
  ListBucketsCommand,
  type ListBucketsCommandInput,
  ListObjectsV2Command,
  type ListObjectsV2CommandInput,
  type _Object,
  type CommonPrefix
} from '@aws-sdk/client-s3';
import axios from 'axios';
import { s3Client } from '@/aws';
import { winstonLogger } from '@/middleware';

type S3ObjectsList = {
  commonPrefixes: CommonPrefix[];
  contents: _Object[];
};

/**
 * A bucket Object is of type:
 *
 * {
 *   "Name": "sample-bucket",
 *   "CreationDate": "2025-03-07T12:04:42.000Z",
 *   "BucketRegion": "ap-south-1"
 * }
 */
export async function listS3Buckets(
  buckets: Bucket[] = [],
  limit: number = 10,
  continuationToken?: string,
  prefix?: string
) {
  const input: ListBucketsCommandInput = {
    MaxBuckets: limit,
    ContinuationToken: continuationToken,
    Prefix: prefix
    // BucketRegion: "ap-south-1",
  };
  const command = new ListBucketsCommand(input);
  const result = await s3Client.send(command);
  if (result.Buckets) {
    buckets.push(...result.Buckets);
  }

  if (result.ContinuationToken) {
    return listS3Buckets(buckets, limit, result.ContinuationToken, prefix);
  }
  return buckets;
}

/**
 * Get the contents and commonPrefixes of a S3 bucket.
 *
 * Use "sheets/" for getting objects under "sheets" folder.
 * Do test again on a larger dataset. This function will NOT
 * return versions for the keys.
 *
 * Use "ListObjectVersions" command and specify the exact key
 * name, Ex: "HappyFace.jpg" or "folder/HappyFace.jpg" to fetch
 * all versions for this specific file.
 */

type ListS3BucketObjectsProps = {
  bucketName: string;
  s3Objects?: S3ObjectsList;
  limit?: number;
  continuationToken?: string;
  prefix?: string;
};

export async function listS3BucketObjects({
  bucketName,
  s3Objects = { commonPrefixes: [], contents: [] },
  limit = 10,
  continuationToken,
  prefix
}: ListS3BucketObjectsProps) {
  const input: ListObjectsV2CommandInput = {
    Bucket: bucketName,
    MaxKeys: limit,
    ContinuationToken: continuationToken,
    Prefix: prefix,
    /* This is key for getting CommonPrefixes */
    Delimiter: '/'
  };
  const command = new ListObjectsV2Command(input);
  const result = await s3Client.send(command);
  if (result.CommonPrefixes) {
    s3Objects.commonPrefixes.push(...result.CommonPrefixes);
  }
  if (result.Contents) {
    s3Objects.contents.push(...result.Contents);
  }

  if (result.ContinuationToken) {
    return listS3BucketObjects({
      bucketName,
      s3Objects,
      limit,
      continuationToken: result.ContinuationToken,
      prefix
    });
  }
  return s3Objects;
}

export async function uploadFileToS3(file: Blob, presignedUrl: string) {
  try {
    await axios.put(presignedUrl, file, {
      headers: {
        'Content-Type': file.type,
        'Content-Length': file.size.toString()
      }
    });
    winstonLogger.info('File uploaded successfully!');
  } catch (error) {
    winstonLogger.error('Error uploading file:', error);
  }
}
