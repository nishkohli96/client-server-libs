import {
  Bucket,
  ListBucketsCommand,
  ListBucketsCommandInput
} from '@aws-sdk/client-s3';
import { s3Client } from '@/aws';

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
    // BucketRegion: "STRING_VALUE",
  };
  const command = new ListBucketsCommand(input);
  const result = await s3Client.send(command);
  if(result.Buckets) {
    buckets.push(...result.Buckets);
  }

  if (result.ContinuationToken) {
    return listS3Buckets(buckets, limit, result.ContinuationToken, prefix);
  }
  return buckets;
}
