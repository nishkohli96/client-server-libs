import axios from 'axios';

type UploadS3FileProps = {
  preSignedUrl: string;
  file: File
};

export async function uploadFileToS3({
  preSignedUrl,
  file,
}: UploadS3FileProps) {
  const s3UploadResponse = await axios.put(preSignedUrl, file, {
    headers: {
      'Content-Type': file.type,
      'Content-Length': file.size
    }
  });
  return s3UploadResponse;
}
