// "use client"

import type { Metadata } from 'next';
import { ClientContext } from 'graphql-hooks';
import { datoCmsClient } from '@/graphql/client';

type LayoutProps = {
  children: React.ReactNode;
};

export const metadata: Metadata = {
  title: 'DatoCMS',
  description: 'Dato CMS data fetching'
};

export default function DatoCMSPageLayout({ children }: LayoutProps) {
  return (
    // <ClientContext.Provider value={datoCmsClient}>
    <>
      {children}
    </>
    // </ClientContext.Provider>
  );
}
