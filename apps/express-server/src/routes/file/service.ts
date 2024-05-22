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
      const chunkDir = path.join(FileRouteConfig.uploadFolder, 'chunks', fileName);

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

  combineFileChunks(res: Response, fileName: string) {
    const chunkDir = path.join(FileRouteConfig.uploadFolder, 'chunks', fileName);
    const outputFilePath = path.join(FileRouteConfig.uploadFolder, `${fileName}`);

    const chunkFiles = fs.readdirSync(chunkDir).sort((a, b) => {
      const aNum = parseInt(a.split('_')[1]);
      const bNum = parseInt(b.split('_')[1]);
      return aNum - bNum;
    });

    const writeStream = fs.createWriteStream(outputFilePath);

    chunkFiles.forEach(chunkFile => {
      const chunkPath = path.join(chunkDir, chunkFile);
      const data = fs.readFileSync(chunkPath);
      writeStream.write(data);
      /* Optionally delete chunk file after merging */
      // fs.unlinkSync(chunkPath);
    });

    writeStream.end(() => {
      res.sendFile(outputFilePath, { root: '.' });
      /* Optionally delete chunk directory after merging */
      // fs.rmdirSync(chunkDir);
    });

    res.send('File retrieved');
  }
}

export default new FileService();
