import { lazy } from 'react';
import RouteNames from './route-names';

const DatoCMSPage = lazy(() => import('pages/dato-cms'));
const FileUploadsPage = lazy(() => import('pages/files-upload'));

const PeoplePage = lazy(() => import('pages/people'));
const AddPersonPage = lazy(() => import('pages/people/add'));

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
    path: RouteNames.people.rootPath,
    text: 'People List',
    element: <PeoplePage />
  },
  {
    path: `${RouteNames.people.rootPath}/${RouteNames.people.subRoutes.add}`,
    text: 'Add Person',
    element: <AddPersonPage />
  }
];
