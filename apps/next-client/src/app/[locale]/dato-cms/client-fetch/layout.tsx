'use client';

import { ClientContext } from 'graphql-hooks';
import { datoCmsClient } from '@/services/graphql';

type LayoutProps = {
  children: React.ReactNode;
};

export default function DatoCMSClientLayout({ children }: LayoutProps) {
  return (
    <ClientContext.Provider value={datoCmsClient}>
      {children}
    </ClientContext.Provider>
  );
}
