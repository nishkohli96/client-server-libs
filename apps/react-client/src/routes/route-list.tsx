import { lazy } from 'react';
import RouteNames from './route-names';

const DatoCMSPage = lazy(() => import('pages/dato-cms'));

export const RouteList = [
  {
    path: RouteNames.datoCMS,
    text: 'Dato CMS',
    element: <DatoCMSPage />
  }
];
