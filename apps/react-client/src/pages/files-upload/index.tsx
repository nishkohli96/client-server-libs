import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { toast } from 'react-toastify';
import { ExpressServerEndpoints } from '@csl/react-express';
import { serverApi, handleApiError } from 'api';
import { PageLayout } from 'components';
import { FileUploader } from './components';

const pageTitle = 'File Uploads';
const rootPath = ExpressServerEndpoints.files.rootPath;
const subRoutes = ExpressServerEndpoints.files.subRoutes;

export default function FilesUploadPage() {
  const handleFileUpload = async (file: File) => {
    const formData = new FormData();
    formData.append('media', file);
    try {
      await serverApi.post(`${rootPath}/${subRoutes.upload}`, formData);
      toast.success('File Uploaded');
    } catch (err) {
      handleApiError(err);
    }
  };

  const onLargeFileUpload = async (file: File) => {
    /* Splitting file into 20MB */
    const chunkSize = 20 * 1024 * 1024;
    let start = 0;
    let end = chunkSize;
    let chunkNumber = 0;
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
          `${rootPath}/${subRoutes.combineFile}/${file.name}`
        );
        toast.success('File uploaded');
      } catch (err) {
        handleApiError(err);
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
      reader.onerror = error => reject(error);
      reader.readAsDataURL(file);
    });
  }

  const onLargeFileUploadAsBase64 = async (file: File) => {
    /**
     * Splitting file into 7MB chunks. Even after adjusting
     * max fieldSize for multer in express-server, I can't
     * upload a bigger chunk than this limit.
     */
    const chunkSize = 7 * 1024 * 1024;
    let start = 0;
    let end = chunkSize;
    let chunkNumber = 0;
    const success = true;

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
  };

  return (
    <PageLayout seoTitle={pageTitle}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Typography>File Uploads</Typography>
          <FileUploader onFileUpload={handleFileUpload} />
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography>Large File Upload as Chunks</Typography>
          <FileUploader onFileUpload={onLargeFileUpload} anyFileType />
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography>Large File Upload as base64</Typography>
          <FileUploader onFileUpload={onLargeFileUploadAsBase64} anyFileType />
        </Grid>
      </Grid>
    </PageLayout>
  );
}
