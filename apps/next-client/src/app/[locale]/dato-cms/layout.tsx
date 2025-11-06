import { Fragment, type ReactNode } from 'react';
import type { Metadata } from 'next';

type LayoutProps = {
  children: ReactNode;
};

export const metadata: Metadata = {
  title: 'DatoCMS',
  description: 'Dato CMS data fetching'
};

export default function DatoCMSPageLayout({ children }: LayoutProps) {
  return (
    <Fragment>
      {children}
    </Fragment>
  );
}
