import { useState } from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import LinearProgress from '@mui/material/LinearProgress';
import { toast } from 'react-toastify';
import { ExpressServerEndpoints } from '@csl/react-express';
import { serverApi, handleApiError } from 'api';
import { PageLayout } from 'components';
import { FileUploader } from './components';

const pageTitle = 'File Uploads';
const rootPath = ExpressServerEndpoints.files.rootPath;
const subRoutes = ExpressServerEndpoints.files.subRoutes;

const FilesUploadPage = () => {
  const [showProgress, setShowProgress] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleFileUpload = async (file: File | FileList) => {
    if (file instanceof File) {
      const formData = new FormData();
      formData.append('media', file);
      try {
        await serverApi.post(`${rootPath}/${subRoutes.upload}`, formData);
        toast.success('File Uploaded');
      } catch (err) {
        handleApiError(err);
      }
    }
  };

  const handleMultipleFileUpload = async (files: File | FileList) => {
    if (files instanceof FileList) {
      const formData = new FormData();
      for (const file of files) {
        formData.append('files', file);
      }
      try {
        await serverApi.post(`${rootPath}/${subRoutes.uploadMany}`, formData);
        toast.success('File Uploaded');
      } catch (err) {
        handleApiError(err);
      }
    }
  };

  const onLargeFileUpload = async (file: File | FileList) => {
    if (file instanceof File) {
      setShowProgress(true);
      /* Splitting file into 20MB */
      const chunkSize = 20 * 1024 * 1024;
      let start = 0;
      let end = chunkSize;
      let chunkNumber = 0;
      let bytesUploaded = 0;

      /**
       * In case, there is some error on the server side, say
       * "uploads/chunks" dir doesn't exist, stop sending further
       * requests on the upload of 1st chunk, and also deny
       * sending the combine-file api request.
       */
      let success = true;

      while (start < file.size) {
        if (success) {
          const chunk = file.slice(start, end);
          const formData = new FormData();
          formData.append('chunk', chunk);
          formData.append('chunkNumber', `${chunkNumber}`);
          formData.append('fileName', file.name);

          try {
            await serverApi.post(
              `${rootPath}/${subRoutes.uploadChunk}`,
              formData,
              {
                onUploadProgress: progressEvent => {
                  const uploaded = bytesUploaded + progressEvent.loaded;
                  setProgress(Math.min((uploaded / file.size) * 100, 100));
                }
              }
            );
            bytesUploaded += chunk.size;
            start = end;
            end = start + chunkSize;
            chunkNumber += 1;
          } catch (err) {
            success = false;
            handleApiError(err);
          }
        } else {
          break;
        }
      }
      if (bytesUploaded === file.size) {
        try {
          await serverApi.get(
            `${rootPath}/${subRoutes.combineFile}/${file.name}`
          );
          toast.success('File uploaded');
        } catch (err) {
          handleApiError(err);
        }
      }
    }
  };

  function convertToBase64(file: Blob): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          resolve(reader.result.split(',')[1]);
        } else {
          reject(new Error('FileReader result is not a string'));
        }
      };
      reader.onerror = error => {
        console.log('error: ', error);
        reject(new Error('FileReader encountered an error'));
      };
      reader.readAsDataURL(file);
    });
  }

  const onLargeFileUploadAsBase64 = async (file: File | FileList) => {
    if (file instanceof File) {
      /**
       * Splitting file into 7MB chunks. Even after adjusting
       * max fieldSize for multer in express-server, I can't
       * upload a bigger chunk than this limit.
       */
      const chunkSize = 7 * 1024 * 1024;
      let start = 0;
      let end = chunkSize;
      let chunkNumber = 0;
      let success = true;

      while (start < file.size) {
        if (success) {
          const chunk = file.slice(start, end);
          const base64Chunk = await convertToBase64(chunk);

          const formData = new FormData();
          formData.append('chunk', base64Chunk);
          formData.append('chunkNumber', `${chunkNumber}`);
          formData.append('fileName', file.name);

          try {
            await serverApi.post(
              `${rootPath}/${subRoutes.uploadBase64}`,
              formData
            );
            start = end;
            end = start + chunkSize;
            chunkNumber += 1;
          } catch (err) {
            success = false;
            handleApiError(err);
          }
        } else {
          break;
        }
      }

      if (success) {
        try {
          await serverApi.get(
            `${rootPath}/${subRoutes.combineBase64}/${file.name}`
          );
          toast.success('File uploaded');
        } catch (err) {
          handleApiError(err);
        }
      }
    }
  };

  return (
    <PageLayout seoTitle={pageTitle}>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Typography>Single File Upload</Typography>
          <FileUploader onFileUpload={handleFileUpload} />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Typography>Multiple Files Upload</Typography>
          <FileUploader onFileUpload={handleMultipleFileUpload} multiple />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Typography>Large File Upload as Chunks</Typography>
          <FileUploader onFileUpload={onLargeFileUpload} anyFileType />
          {showProgress && (
            <LinearProgress
              variant="determinate"
              value={progress}
              sx={{ mt: '20px' }}
            />
          )}
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Typography>Large File Upload as base64</Typography>
          <FileUploader onFileUpload={onLargeFileUploadAsBase64} anyFileType />
        </Grid>
      </Grid>
    </PageLayout>
  );
};

export default FilesUploadPage;
