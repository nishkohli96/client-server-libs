/**
 * Define all route path-names here, so that any
 * future change can be easily applied across throughout
 * the application.
 */

const RouteNames = {
  home: '/',
  datoCMS: '/dato-cms',
  fileUploads: '/file-uploads',
  people: {
    rootPath: '/people',
    subRoutes: {
      add: 'add',
      view: 'view',
      edit: 'edit'
    }
  }
};

export default RouteNames;
