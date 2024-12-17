import { lazy } from 'react';
import { RouteItem } from 'types';
import RouteNames from './route-names';

const DatoCMSPage = lazy(() => import('pages/dato-cms'));
const FileUploadsPage = lazy(() => import('pages/files-upload'));

const PeoplePage = lazy(() => import('pages/people'));
const AddPersonPage = lazy(() => import('pages/people/add'));
const ViewPersonPage = lazy(() => import('pages/people/view'));
const EditPersonPage = lazy(() => import('pages/people/edit'));

export const RouteList: RouteItem[] = [
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
  /* Person Routes */
  {
    path: RouteNames.people.rootPath,
    text: 'People List',
    element: <PeoplePage />
  },
  {
    path: `${RouteNames.people.rootPath}/${RouteNames.people.subRoutes.add}`,
    text: 'Add Person',
    element: <AddPersonPage />,
    hideFromHomePage: true
  },
  {
    path: `${RouteNames.people.rootPath}/${RouteNames.people.subRoutes.view}`,
    text: 'View Person',
    element: <ViewPersonPage />,
    hideFromHomePage: true
  },
  {
    path: `${RouteNames.people.rootPath}/${RouteNames.people.subRoutes.edit}`,
    text: 'Edit Person',
    element: <EditPersonPage />,
    hideFromHomePage: true
  },
];
