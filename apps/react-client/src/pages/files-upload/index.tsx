import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { toast } from 'react-toastify';
import { serverApi } from 'api';
import { ServerEndpoints } from 'app-constants';
import { PageLayout } from 'components';
import { FileUploader } from './components';

const pageTitle = 'File Uploads';
const rootPath = ServerEndpoints.file.rootPath;
const subRoutes = ServerEndpoints.file.subRoutes;

export default function FilesUploadPage() {

  const handleFileUpload = async (file: File) => {
    const formData = new FormData();
    formData.append('media', file);
    try {
      await serverApi.post(
        `${rootPath}/${subRoutes.upload}`,
        formData
      );
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
        await serverApi.post(`${rootPath}/${subRoutes.largeUpload}`, formData);
        start = end;
        end = start + chunkSize;
        chunkNumber++;
      } catch (err) {
        toast.error(JSON.stringify(err));
      }
    }
    toast.success('File uploaded');
  };

  return (
    <PageLayout seoTitle={pageTitle}>
      <Grid container>
        <Grid item xs={12} md={6}>
          <Typography>File Uploads</Typography>
          <FileUploader onFileUpload={handleFileUpload} />
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography>Large File Upload</Typography>
          <FileUploader onFileUpload={onLargeFileUpload} anyFileType />
        </Grid>
      </Grid>
    </PageLayout>
  );
}
