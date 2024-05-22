import { Router, Response } from 'express';
import { createUploadFolder, fileUploader } from './middleware';
import { RouteList } from 'app-constants';
import { FileRouteConfig } from './config';
import fileService from './service';
import * as FileTypeDefs from './types';

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
 * hitting the combine file api to get the full file on the
 * server.
 */
fileRouter.post(
  `/${subRoutes.largeUpload}`,
  createUploadFolder,
  mediaUploader.single('chunk'),
  function uploadLargeFile(req: FileTypeDefs.UploadLargeFileReq, res: Response) {
    const { chunkNumber, fileName } = req.body;
    const chunkPath = req.file?.path ?? '';
    return fileService.uploadLargeFile(res, fileName, chunkPath, Number(`${chunkNumber}`));
  }
);

export { fileRouter };
