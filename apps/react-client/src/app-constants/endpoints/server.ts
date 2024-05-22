export const ServerEndpoints = Object.freeze({
  file: {
    rootPath: '/file',
    subRoutes: {
      upload: 'upload',
      uploadChunk: 'upload-chunk',
      combineFile: 'combine-file'
    }
  }
});
