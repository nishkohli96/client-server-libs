import { Fragment } from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { Image } from 'react-datocms';
import { Loading } from '@csl/shared-fe';
import { useDatoCMSQuery } from 'hooks';
import { PageLayout } from 'components';
import { StoreLocationsQuery } from './queries';

const pageTitle = 'DatoCMS Querying';

type Store = {
  storeName: string;
  storeImage: {
    url: string;
    responsiveImage: { width: number; height: number } & Record<
      string,
      string | number | null
    >;
  };
  storeLocation: {
    latitude: number;
    longitude: number;
  };
};

const DatoCMSPage = () => {
  const { data: storesList, isLoading } = useDatoCMSQuery<{
    allStores: Store[];
  }>(StoreLocationsQuery(5, 1));

  return (
    <PageLayout seoTitle={pageTitle}>
      <Grid container spacing={2}>
        {isLoading
          ? (
            <Loading />
          )
          : (
            <Fragment>
              {storesList
                && storesList.allStores.map((store, idx) => (
                  <Grid size={{ xs: 12, md: 6 }} key={idx}>
                    <Typography>
                      {store.storeName}
                    </Typography>
                    <Image
                      data={store.storeImage.responsiveImage}
                      key={store.storeName}
                    />
                  </Grid>
                ))}
            </Fragment>
          )}
      </Grid>
    </PageLayout>
  );
};

export default DatoCMSPage;
