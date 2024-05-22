import { Request, Response, NextFunction } from 'express';
import fs from 'fs';
import path from 'path';
import moment from 'moment';
import multer, { FileFilterCallback } from 'multer';
import { FileRouteConfig } from './config';

export function createUploadFolder(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const subFolder = moment().format('YYYY-MMM');
  const folderPath = path.join(FileRouteConfig.uploadFolder, subFolder);

  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
  }
  next();
}

const fileFilter = function (allowedFileTypes?: string[]) {
  return function applyFileFilter(
    _: Request,
    file: Express.Multer.File,
    cb: FileFilterCallback
  ) {
    const fileExtension = path.extname(file.originalname).toLowerCase();
    if (!allowedFileTypes) {
      cb(null, true);
    } else if (allowedFileTypes && allowedFileTypes.includes(fileExtension)) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  };
};

const fileStorage = (dirPath: string) =>
  multer.diskStorage({
    /* Destination folder for uploaded files */
    destination(req, file, cb) {
	  const subFolderName = moment().format('YYYY-MMM');
	  const directoryPath = path.join(dirPath, subFolderName);
      cb(null, directoryPath);
    },
    /* Can modify file name based on req params */
    filename(req, file, cb) {
      cb(null, file.originalname);
    }
  });

export const fileUploader = (dirPath: string, allowedFileTypes?: string[]) =>
  multer({
    storage: fileStorage(dirPath),
    fileFilter: fileFilter(allowedFileTypes)
  });
