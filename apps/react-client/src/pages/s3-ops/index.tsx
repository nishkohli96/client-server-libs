import { useState } from 'react';
import { toast } from 'react-toastify';
import Button from '@mui/material/Button';
import { uploadFileToS3 } from '@csl/react-express';
import { PageLayout } from 'components';
import {
  getS3PresignedUrl,
  getPreSignedFileUrl,
  downloadFile
} from 'api/services';
import { sanitizeFileName } from 'utils';
import '@uploadcare/react-uploader/core.css';
import axios from 'axios';

/**
 * Uploadcare has 14-days of access to premium features, and is then
 * a paid service.
 */
const S3OpsPage = () => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const uploadToS3 = async () => {
    try {
      if (!uploadedFile) {
        toast.error('Upload a file please...');
        return;
      }
      const sanitizedFile = sanitizeFileName(uploadedFile);
      const preSignedURL = await getS3PresignedUrl({
        fileName: sanitizedFile.name
      });
      if (preSignedURL) {
        await uploadFileToS3({
          preSignedUrl: preSignedURL,
          file: sanitizedFile
        });
      }
    } catch (error) {
      toast.error(
        `Error uploading file to S3: ${JSON.stringify(error, null, 2)}`
      );
    }
  };

  const fetchAndOpenFile = async () => {
    try {
      const preSignedURL = await getPreSignedFileUrl({
        fileName: 'Aadhaar_nishant.jpg'
      });
      if (preSignedURL) {
        const response = await axios.get(preSignedURL, {
          responseType: 'blob'
        });
        const blob = response.data;
        const fileUrl = window.URL.createObjectURL(blob);
        window.open(fileUrl, '_blank');
        /* Clean up object URL after some time */
        setTimeout(() => URL.revokeObjectURL(fileUrl), 30000);
      }
    } catch (error) {
      console.log('error: ', error);
      toast.error(
        `Error opening file from S3: ${JSON.stringify(error, null, 2)}`
      );
    }
  };

  const downloadFileFromS3 = async () => {
    try {
      const fileName = 'products.csv';
      const blobData = await downloadFile({ fileName });
      if (blobData) {
        const fileUrl = window.URL.createObjectURL(blobData);
        const link = document.createElement('a');
        link.href = fileUrl;
        link.setAttribute('download', fileName);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(fileUrl);
      }
    } catch (error) {
      console.log('error: ', error);
      toast.error(
        `Error downloading file from S3: ${JSON.stringify(error, null, 2)}`
      );
    }
  };

  return (
    <PageLayout seoTitle="S3 Ops">
      <br />
      <Button variant="outlined" color="primary" onClick={uploadToS3}>
        Upload to S3
      </Button>
      <br />
      <Button variant="outlined" color="primary" onClick={fetchAndOpenFile}>
        Open File from S3
      </Button>
      <br />
      <Button variant="outlined" color="primary" onClick={downloadFileFromS3}>
        Download File from S3
      </Button>
    </PageLayout>
  );
};

export default S3OpsPage;
