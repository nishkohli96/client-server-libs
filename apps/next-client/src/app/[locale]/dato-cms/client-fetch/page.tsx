'use client';

import { useQuery } from 'graphql-hooks';
import Image from 'next/image';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { PageHeading, Loading } from '@csl/shared-fe';
import { SingleStoreLocationsQuery } from '@/services/graphql/queries';

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

export default function StoreDataPage() {
  const {
    loading,
    error,
    data: storeInfo
  } = useQuery<{ store: Store }>(SingleStoreLocationsQuery);
  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <PageHeading title="Error" />;
  }

  return (
    <Grid container>
      <PageHeading title="DatoCMS" />
      {storeInfo && (
        <Grid size={{ xs: 12 }}>
          <Typography>
            {storeInfo.store.storeName}
          </Typography>
          <Image
            src={storeInfo.store.storeImage.url}
            alt={storeInfo.store.storeName}
            width={storeInfo.store.storeImage.responsiveImage.width}
            height={storeInfo.store.storeImage.responsiveImage.height}
            priority
          />
        </Grid>
      )}
    </Grid>
  );
}
