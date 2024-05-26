import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { toast } from 'react-toastify';
import { ExpressServerEndpoints } from '@csl/react-express';
import { serverApi } from 'api';
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
      toast.error(JSON.stringify(err));
    }
  };

  const onLargeFileUpload = async (file: File) => {
    /* Splitting file into 20MB */
    const chunkSize = 20 * 1024 * 1024;
    let start = 0;
    let end = chunkSize;
    let chunkNumber = 0;

    while (start < file.size) {
      const chunk = file.slice(start, end);
      const formData = new FormData();
      formData.append('chunk', chunk);
      formData.append('chunkNumber', `${chunkNumber}`);
      formData.append('fileName', file.name);

      try {
        await serverApi.post(`${rootPath}/${subRoutes.uploadChunk}`, formData);
        start = end;
        end = start + chunkSize;
        chunkNumber += 1;
      } catch (err) {
        toast.error(JSON.stringify(err));
      }
    }

    await serverApi.get(`${rootPath}/${subRoutes.combineFile}/${file.name}`);
    toast.success('File uploaded');
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
    /* Splitting file into 20MB */
    const chunkSize = 9 * 1024 * 1024;
    let start = 0;
    let end = chunkSize;
    let chunkNumber = 0;

    while (start < file.size) {
      const chunk = file.slice(start, end);
      const base64Chunk = await convertToBase64(chunk);

      const formData = new FormData();
      formData.append('chunk', base64Chunk);
      formData.append('chunkNumber', `${chunkNumber}`);
      formData.append('fileName', file.name);

      try {
        await serverApi.post(`${rootPath}/${subRoutes.uploadBase64}`, formData);
        start = end;
        end = start + chunkSize;
        chunkNumber += 1;
      } catch (err) {
        toast.error(JSON.stringify(err));
      }
    }

    await serverApi.get(`${rootPath}/${subRoutes.combineBase64}/${file.name}`);
    toast.success('File uploaded');
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
