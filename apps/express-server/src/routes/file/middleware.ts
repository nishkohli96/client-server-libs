import { Request, Response, NextFunction } from 'express';
import fs from 'fs';
import path from 'path';
import moment from 'moment';
import multer, { FileFilterCallback } from 'multer';
import { FileRouteConfig } from './config';

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

const fileStorage = (dirPath?: string) =>
  multer.diskStorage({
    /**
     * Destination folder for uploaded files. Create
     * directory if it doesn't exist. Else everything
     * will be directly uploaded to the "uploads" folder.
     */
    destination(req, file, cb) {
      let folderPath = path.join(FileRouteConfig.uploadFolder);
      if(dirPath) {
        folderPath = path.join(folderPath, dirPath);
      }
      if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath, { recursive: true });
      }
      cb(null, folderPath);
    },
    /* Can modify file name based on req params */
    filename(req, file, cb) {
      cb(null, file.originalname);
    }
  });

/**
 * A dynamic fileUploader function that will create a directory,
 * if it doesn't exist and then upload file to that folder.
 */
export const fileUploader = (dirPath?: string, allowedFileTypes?: string[]) =>
  multer({
    storage: fileStorage(dirPath),
    fileFilter: fileFilter(allowedFileTypes)
  });
