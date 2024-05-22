import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { toast } from 'react-toastify';
import { serverApi } from 'api';
import { ServerEndpoints } from 'app-constants';
import { PageLayout } from 'components';
import { FileUploader } from './components';

const rootPath = ServerEndpoints.file.rootPath;
const subRoutes = ServerEndpoints.file.subRoutes;

export default function FilesUploadPage() {
  const pageTitle = 'File Uploads';

  const handleFileUpload = async (file: File) => {
    const formData = new FormData();
    formData.append('media', file);
    try {
      const response = await serverApi.post(
        `${rootPath}/${subRoutes.upload}`,
        formData
      );
      console.log('response: ', response);
	  toast.success('File Uploaded');
    } catch (err) {
      toast.error(JSON.stringify(err));
    }
  };

  return (
    <PageLayout seoTitle={pageTitle}>
      <Grid container>
        <Grid item xs={12}>
          <Typography>File Uploads</Typography>
          <FileUploader onFileUpload={handleFileUpload} />
        </Grid>
      </Grid>
    </PageLayout>
  );
}
