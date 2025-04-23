import { lazy } from 'react';
import { type RouteItem } from 'types';
import RouteNames from './route-names';

const DatoCMSPage = lazy(() => import('pages/dato-cms'));
const FileUploadsPage = lazy(() => import('pages/files-upload'));
const EventsPage = lazy(() => import('pages/events'));
const S3OpsPage = lazy(() => import('pages/s3-ops'));

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
  {
    path: RouteNames.events,
    text: 'Events',
    element: <EventsPage />
  },
  {
    path: RouteNames.s3Ops,
    text: 'S3 Ops',
    element: <S3OpsPage />
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
  }
];
