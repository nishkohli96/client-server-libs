const oneMb = 1024 * 1024;

function setSizeInMB(size?: number): number {
  if(!size) {
    size = 1;
  }
  return size * oneMb;
}

export const ServerConfig = Object.freeze({
  multer: {
    maxFiles: 3,
    maxFieldLimit: setSizeInMB(10),
    maxFileSize: setSizeInMB(50),
    maxNonFileFields: 10,
    maxParts: 11,
    dirs: {
      base64: 'base64',
      chunk: 'chunks',
      /**
       * This folder will be outside the src directory, so that
       * the build can also access the media at this path.
       */
      upload: 'uploads'
    }
  }
});
