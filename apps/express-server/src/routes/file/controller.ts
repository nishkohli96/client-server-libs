import { Router, Response } from 'express';
import { createUploadFolder, fileUploader } from './middleware';
import { RouteList } from 'app-constants';
import { FileRouteConfig } from './config';
import fileService from './service';
import * as FileTypeDefs from './types';

const fileRouter = Router();
const subRoutes = RouteList.files.subRoutes;
const mediaUploader = fileUploader(FileRouteConfig.uploadFolder);

fileRouter.post(
  `/${subRoutes.upload}`,
  createUploadFolder,
  mediaUploader.single('media'),
  function uploadFile(req: FileTypeDefs.UploadMediaRequest, res: Response) {
    const file = req.file;
    console.log('file: ', file);
    return res.send('done');
    // return fileService.uploadFile(res, file);
  }
);

export { fileRouter };
