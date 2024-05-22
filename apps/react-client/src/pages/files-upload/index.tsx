import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { PageLayout } from 'components';
import { FileUploader } from './components';

export default function FilesUploadPage() {
  const pageTitle = 'File Uploads';

  const handleFileUpload = (file: File) => {
    console.log('file: ', file);
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
