import { Router, Response } from 'express';
import { ExpressServerEndpoints } from '@csl/react-express';
import { fileUploader } from './middleware';
import fileService from './service';
import * as FileTypeDefs from './types';

const fileRouter = Router();
const subRoutes = ExpressServerEndpoints.files.subRoutes;
const mediaUploader = fileUploader('test-folder/some-dir');
const chunkUploader = fileUploader('chunks');
const uploader = fileUploader();

/**
 * Uploading a single file, here "media" in
 * mediaUploader.single is the fieldName of the
 * formData in which the blob is appended.
 */
fileRouter.post(
  `/${subRoutes.upload}`,
  mediaUploader.single('media'),
  function uploadFile(req: FileTypeDefs.UploadMediaRequest, res: Response) {
    const file = req.file;
    return fileService.uploadFile(res, file);
  }
);

/**
 * Uploading large file by splitting into chunks, and then
 * hitting the combine-file api to get the full file on the
 * server.
 */
fileRouter.post(
  `/${subRoutes.uploadChunk}`,
  chunkUploader.single('chunk'),
  function uploadChunks(
    req: FileTypeDefs.UploadLargeFileReq,
    res: Response
  ) {
    const { chunkNumber, fileName } = req.body;
    const chunkPath = req.file?.path ?? '';
    return fileService.uploadChunks(
      res,
      fileName,
      chunkPath,
      Number(`${chunkNumber}`)
    );
  }
);

/**
 * Get filename along with the extension in params, combine
 * all the chunks stored from the above endpoint into the
 * resultant file and delete these chunks.
 */
fileRouter.get(
  `/${subRoutes.combineFile}/:fileName`,
  function combineFileChunks(
    req: FileTypeDefs.CombineChunksReq,
    res: Response
  ) {
    const fileName = req.params.fileName;
    return fileService.combineFileChunks(res, fileName);
  }
);

/**
 * Uploading large file by splitting into chunks and encoding
 * as base64, and then hitting the combine-file api to get the
 * full file on the server.
 *
 * Base64 are sent as strings, somehow no folder is created, even
 * if provided as an argument. If no file is sent in the form data,
 * the destination function inside multer.diskStorage won't be
 * executed, and therefore the folder won't be created
 */
fileRouter.post(
  `/${subRoutes.uploadBase64}`,
  uploader.single('chunk'),
  function uploadBase64(
    req: FileTypeDefs.UploadLargeFileReq,
    res: Response
  ) {
    const { chunkNumber, fileName, chunk } = req.body;
    return fileService.uploadBase64(
      res,
      fileName,
      chunk,
      Number(`${chunkNumber}`)
    );
  }
);

/**
 * Get filename along with the extension in params, combine
 * all the chunks stored from the above endpoint into the
 * resultant file and delete these chunks.
 */
fileRouter.get(
  `/${subRoutes.combineBase64}/:fileName`,
  function combineBase64Files(
    req: FileTypeDefs.CombineChunksReq,
    res: Response
  ) {
    const fileName = req.params.fileName;
    return fileService.combineBase64Files(res, fileName);
  }
);

export { fileRouter };
