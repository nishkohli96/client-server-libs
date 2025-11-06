/**
 * PS if I import from '@/services/graphql', it would give me
 * an error, since this module also exports GraphQLClient which
 * is a client component and  not compatible with server components.
 */
import { Fragment } from 'react';
import Image from 'next/image';
import axios from 'axios';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { ApiEndpoints, ENV_VARS } from '@/constants';
import { SingleStoreLocationsQuery } from '@/services/graphql/queries';

type StoreData = {
  data: {
    store: {
      storeName: string;
      storeImage: {
        url: string;
        responsiveImage: {
          width: number;
          height: number;
        };
      };
    };
  };
};

export default async function DatoCMSServerFetchPage() {
  const response = await axios.post<StoreData>(
    ApiEndpoints.datoCMS,
    { query: SingleStoreLocationsQuery },
    {
      headers: {
        Authorization: `Bearer ${ENV_VARS.datoCMS.key_server}`
        // ...(includeDrafts ? { "X-Include-Drafts": "true" } : {}),
      }
    }
  );
  const storeInfo = response.data.data;

  return (
    <Fragment>
      <Typography sx={{ mb: '30px' }}>
        Server side fetching using DatoCMS api
      </Typography>
      <Grid size={12}>
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
    </Fragment>
  );
}
