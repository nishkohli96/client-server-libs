import Grid from '@mui/material/Grid';
import { PageHeading } from '@core/lib';
import { useDatoCMSQuery } from 'hooks';
import { Loading, PageLayout } from 'components';
import { AllLegalPagesQuery, StoreLocationsQuery } from './queries';

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
  const pageTitle = 'DatoCMS Querying';
  const { data: storesList, isLoading } = useDatoCMSQuery<Store[]>(StoreLocationsQuery(5, 1));

  return (
    <PageLayout seoTitle={pageTitle}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <PageHeading title={pageTitle} />
        </Grid>
        {isLoading ? <Loading /> : (
          <Grid item xs={12}>
            {JSON.stringify(storesList)}
          </Grid>
        )}
      </Grid>
    </PageLayout>
  );
}
