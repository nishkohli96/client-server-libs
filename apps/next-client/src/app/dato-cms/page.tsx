'use client';

import { ClientContext } from 'graphql-hooks';
import { datoCmsClient } from '@/graphql/client';
import StoreDataPage from './components/StoreData';

export default function DatoCMSPage() {
  return (
    <ClientContext.Provider value={datoCmsClient}>
      <StoreDataPage/>
    </ClientContext.Provider>
  );
}
