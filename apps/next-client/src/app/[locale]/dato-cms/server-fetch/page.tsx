/**
 * After upgrading dependencies, somehow I have to make this file
 * a client component otherwise it will not work. I don't know why
 * this is the case.
 */
'use client';

import { Fragment } from 'react';
import Image from 'next/image';
import axios from 'axios';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { ApiEndpoints, ENV_VARS } from '@/constants';
import { SingleStoreLocationsQuery } from '@/services/graphql';

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

async function test() {
  const response = await fetch(ApiEndpoints.datoCMS, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${ENV_VARS.datoCMS.key_server}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      query: SingleStoreLocationsQuery
    })
  });
  const { data }: StoreData = await response.json();
  return data;
}

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
