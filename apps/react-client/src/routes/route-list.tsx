import { lazy } from 'react';
import RouteNames from './route-names';

const DatoCMSPage = lazy(() => import('pages/dato-cms'));
const FileUploadsPage = lazy(() => import('pages/files-upload'));
const PeoplePage = lazy(() => import('pages/people'));

export const RouteList = [
  {
    path: RouteNames.datoCMS,
    text: 'Dato CMS',
    element: <DatoCMSPage />
  },
  {
    path: RouteNames.fileUploads,
    text: 'File Uploads',
    element: <FileUploadsPage />
  },
  {
    path: RouteNames.people,
    text: 'People List',
    element: <PeoplePage />
  }
];
