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
  const folderPath = path.join(__dirname, FileRouteConfig.uploadFolder, subFolder);
  console.log('folderPath: ', folderPath);

  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath);
    next();
  } else {
  	next();
  }
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
    destination(req, file, cb) {
      /* Destination folder for uploaded files */
      cb(null, dirPath);
    },
    filename(req, file, cb) {
      /* Use current timestamp as filename to ensure uniqueness */
      cb(null, moment().format('YYYY-MMM') + path.extname(file.originalname));
    }
  });

export const fileUploader = (dirPath: string, allowedFileTypes?: string[]) =>
  multer({
    storage: fileStorage(dirPath),
    fileFilter: fileFilter(allowedFileTypes)
  });
