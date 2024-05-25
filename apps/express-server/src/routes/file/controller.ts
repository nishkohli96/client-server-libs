import { Router, Response } from 'express';
import { RouteList } from 'app-constants';
import { FileRouteConfig } from './config';
import { createUploadFolder, fileUploader } from './middleware';
import fileService from './service';
import * as FileTypeDefs from './types';

/**
 * TODO: fileUploader created uploads/Mth-year dir,
 * which fails to work for large file upload as dir
 * not created, also need to create chunks dir
 */

const fileRouter = Router();
const subRoutes = RouteList.files.subRoutes;
const mediaUploader = fileUploader(FileRouteConfig.uploadFolder);

/**
 * Uploading a single file, here "media" in
 * mediaUploader.single is the fieldName of the
 * formData in which the blob is appended.
 */
fileRouter.post(
  `/${subRoutes.upload}`,
  createUploadFolder,
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
  mediaUploader.single('chunk'),
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
 */
fileRouter.post(
  `/${subRoutes.uploadBase64}`,
  mediaUploader.single('chunk'),
  function uploadBase64(
    req: FileTypeDefs.UploadLargeFileReq,
    res: Response
  ) {
    const { chunkNumber, fileName } = req.body;
    const chunkPath = req.file?.path ?? '';
    return fileService.uploadBase64(
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
