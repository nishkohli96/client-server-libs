import { Request } from 'express';
import { existsSync, mkdirSync } from 'fs';
import path from 'path';
import multer, { FileFilterCallback } from 'multer';
import { ServerConfig } from '@/app-constants';

const fileFilter = (allowedFileTypes?: string[]) => {
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
     * will be directly uploaded to the "public" folder.
     */
    destination(req, file, cb) {
      let folderPath = path.join(ServerConfig.multer.dirs.upload);
      if(dirPath) {
        folderPath = path.join(folderPath, dirPath);
      } else {
        folderPath = path.join(folderPath, file.fieldname);
      }
      if (!existsSync(folderPath)) {
        mkdirSync(folderPath, { recursive: true });
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
    fileFilter: fileFilter(allowedFileTypes),
    limits: {
      /**
       * 50 MB for file size, can easily change the
       * value to say 250mb here itself, no need to
       * change in express config.
       */
      fileSize: ServerConfig.multer.maxFileSize,
      /* 10 MB for non-file fields */
      fieldSize: ServerConfig.multer.maxFieldLimit,
      /* Maximum number of non-file fields */
      fields: ServerConfig.multer.maxNonFileFields,
      /* Maximum number of files */
      files: ServerConfig.multer.maxFiles,
      /* Total number of parts (fields + files) */
      parts: ServerConfig.multer.maxParts
    }
  });
