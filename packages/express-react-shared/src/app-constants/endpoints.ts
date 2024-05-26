export const ExpressServerEndpoints = Object.freeze({
  files: {
    rootPath: '/file',
    subRoutes: {
      upload: 'upload',
      uploadChunk: 'upload-chunk',
      combineFile: 'combine-file',
      uploadBase64: 'upload-base64',
      combineBase64: 'combine-base64'
    }
  }
});