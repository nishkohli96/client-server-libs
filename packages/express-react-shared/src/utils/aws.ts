import axios from 'axios';

type UploadS3FileProps = {
  preSignedUrl: string;
  file: File;
};

/**
 * When trying to upload to S3 using frontend, make sure that the origin
 * is allowed in bucket CORS. Refer aws notes for more details.
 */
export async function uploadFileToS3({
  preSignedUrl,
  file
}: UploadS3FileProps) {
  const s3UploadResponse = await axios.put(preSignedUrl, file, {
    headers: {
      'Content-Type': file.type,
      'Content-Length': file.size
    }
  });
  return s3UploadResponse;
}
