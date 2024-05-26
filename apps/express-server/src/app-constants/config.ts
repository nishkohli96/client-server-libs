export const ServerConfig = Object.freeze({
  maxFieldLimit: 10 * 1024 * 1024,
  /**
   * This folder will be outside the src directory, so that
   * the build can also access the media at this path.
   */
  uploadFolder: 'uploads'
});
