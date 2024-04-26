'use client';

// import { useQuery } from 'graphql-hooks';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { PageHeading, Loading } from '@csl/shared-fe';
import { SingleStoreLocationsQuery } from '@/graphql/queries';
import { ENV_VARS } from '@/app-constants';

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

export default function DatoCMSPage() {
  // const {
  //   loading,
  //   error,
  //   data: storeInfo,
  // } = useQuery<Store>(SingleStoreLocationsQuery);
  // if (loading) {
  //   return <p>Loading </p>;
  // }
  // if (error) {
  //   return <PageHeading title="Error" />;
  // }
  return (
    <Grid container>
      <PageHeading title="DatoCMS" />
      {/* {ENV_VARS.dataCMS_apiKey} */}
      {/* {storeInfo && (
        <Grid item xs={12}>
          <Typography>{storeInfo.storeName}</Typography>
          <Image
            data={store.storeImage.responsiveImage}
            key={store.storeName}
          />
        </Grid>
      )} */}
    </Grid>
  );
}
