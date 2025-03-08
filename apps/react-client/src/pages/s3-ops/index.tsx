import { useState } from 'react';
import { toast } from 'react-toastify';
import Button from '@mui/material/Button';
import {
  FileUploaderRegular,
  OutputCollectionState
} from '@uploadcare/react-uploader';
import { PageLayout } from 'components';
import { ENV_VARS } from 'app-constants';
import { getS3PresignedUrl } from 'api/services';
import { sanitizeFileName, uploadFileToS3 } from 'utils';
import '@uploadcare/react-uploader/core.css';

/**
 * Uploadcare has 14-days of access to premium features, and is then
 * a paid service.
 */
const S3OpsPage = () => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const handleFileChange = (event: OutputCollectionState) => {
    const files = event.successEntries.map(f => f.file) as File[];
    setUploadedFile(files?.length ? files[0] : null);
    console.log('files: ', files);
  };

  const uploadToS3 = async () => {
    try {
      if (!uploadedFile) {
        toast.error('Upload a file please...');
        return;
      }
      const sanitizedFile = sanitizeFileName(uploadedFile);
      const preSignedURL = await getS3PresignedUrl({ fileName: sanitizedFile.name });
      console.log('preSignedURL: ', preSignedURL);
      if(preSignedURL) {
        const response = await uploadFileToS3({
          preSignedUrl: preSignedURL,
          file: sanitizedFile
        });
        console.log('response: ', response);
      }
    } catch (error) {
      toast.error(
        `Error uploading file to S3: ${JSON.stringify(error, null, 2)}`
      );
    }
  };

  return (
    <PageLayout seoTitle="S3 Ops">
      <FileUploaderRegular
        pubkey={ENV_VARS.uploadCareKey}
        onChange={handleFileChange}
      />
      <Button variant="outlined" color="primary" onClick={uploadToS3}>
        Upload to S3
      </Button>
    </PageLayout>
  );
};

export default S3OpsPage;
