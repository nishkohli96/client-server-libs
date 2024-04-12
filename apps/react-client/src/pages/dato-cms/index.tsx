import Grid from '@mui/material/Grid';
import { PageHeading } from '@core/lib';
import { useDatoCMSQuery } from 'hooks';
import { Loading } from 'components';
import { AllLegalPagesQuery } from './queries';

type Store = {
  storeName: string;
  storeImage: {
    url: string;
  }
  storeLocation: {
    latitude: number;
    longitude: number;
  }
}

export default function DatoCMSPage() {
  const { data: storesList, isLoading } = useDatoCMSQuery<Store[]>(AllLegalPagesQuery);
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <PageHeading title="Dato CMS Query Fetching" />
      </Grid>
    </Grid>
  );
}
