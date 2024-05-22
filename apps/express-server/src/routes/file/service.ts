import { Response } from 'express';
import fs from 'fs';
import path from 'path';
import { FileRouteConfig } from './config';

class FileService {
  uploadFile(res: Response, file?: Express.Multer.File) {
    try {
      if (!file) {
        return res.status(400).send('Missing file');
      }
      return res.send('File Uploaded');
    } catch (err) {
      console.log('Error in uploading file ', err);
    }
  }

  uploadLargeFile(
    res: Response,
    fileName: string,
    chunkPath: string,
    chunkNumber: number
  ) {
    try {
      const chunkDir = path.join(FileRouteConfig.uploadFolder, fileName);

      /* Ensure the directory exists */
      if (!fs.existsSync(chunkDir)) {
        fs.mkdirSync(chunkDir);
      }

      /* Move chunk to the appropriate directory */
      const chunkDestination = path.join(chunkDir, `chunk_${chunkNumber}`);
      fs.renameSync(chunkPath, chunkDestination);

      res.send(`Chunk ${chunkNumber} uploaded`);
    } catch (err) {
      console.log('Error in uploading file ', err);
    }
  }
}

export default new FileService();
