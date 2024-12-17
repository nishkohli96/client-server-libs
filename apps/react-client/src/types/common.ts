import { ReactNode, ReactElement } from 'react';

export type LayoutProps = {
  children: ReactNode;
};

export type RouteItem = {
  path: string;
  text: string;
  element: ReactElement;
  hideFromHomePage?: boolean
};
