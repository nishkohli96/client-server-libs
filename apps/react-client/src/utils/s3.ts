/**
 * Code Reference:
 * https://docs.aws.amazon.com/AmazonS3/latest/API/s3_example_s3_Scenario_PresignedUrl_section.html
 */

import axios from 'axios';
import { parseUrl } from '@smithy/url-parser';
import { fromIni } from '@aws-sdk/credential-providers';
import { S3RequestPresigner } from '@aws-sdk/s3-request-presigner';
import { formatUrl } from '@aws-sdk/util-format-url';
import { Hash } from '@smithy/hash-node';
import { HttpRequest } from '@smithy/protocol-http';

type PreSignedUrlProps = {
  region: string;
  bucket: string;
  key: string;
};

type UploadS3File = PreSignedUrlProps & { file: File };

async function createPresignedUrl({
  region,
  bucket,
  key
}: PreSignedUrlProps) {
  const url = parseUrl(`https://${bucket}.s3.${region}.amazonaws.com/${key}`);
  const presigner = new S3RequestPresigner({
    credentials: fromIni(),
    region,
    sha256: Hash.bind(null, 'sha256')
  });

  const signedUrlObject = await presigner.presign(
    new HttpRequest({ ...url, method: 'PUT' })
  );
  return formatUrl(signedUrlObject);
}

export async function uploadFileToS3({
  file,
  region = 'ap-south-1',
  bucket,
  key
}: UploadS3File) {
  const preSignedUrl = await createPresignedUrl({ region, bucket, key });
  const s3UploadResponse = await axios.put(preSignedUrl, file, {
    headers: {
      'Content-Type': file.type,
      'Content-Length': new Blob([file]).size
    }
  });
  return s3UploadResponse;
}
