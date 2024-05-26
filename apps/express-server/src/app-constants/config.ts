export const ServerConfig = Object.freeze({
  multer: {
    maxFiles: 3,
    maxFieldLimit: 10 * 1024 * 1024,
    maxFileSize: 50 * 1024 * 1024,
    maxNonFileFields: 10,
    maxParts: 11,
    /**
		 * This folder will be outside the src directory, so that
		 * the build can also access the media at this path.
		 */
    uploadFolder: 'uploads'
  }
});
