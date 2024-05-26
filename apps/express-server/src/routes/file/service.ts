import { Response } from 'express';
import fs from 'fs';
import path from 'path';
import { ServerConfig } from 'app-constants';

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

  uploadChunks(
    res: Response,
    fileName: string,
    chunkPath: string,
    chunkNumber: number
  ) {
    try {
      const chunkDir = path.join(ServerConfig.uploadFolder, 'chunks', fileName);

      /**
       * Create dir if it doesn't exist. if creating
       * "uploads/chunks/abc.mp4", I need to create
       * "uploads/chunks" first, which is done by providing
       * "chunks" as arg in fileUploader('chunks')
       * middleware, otherwise this will fail to create the dir.
       */
      if (!fs.existsSync(chunkDir)) {
        fs.mkdirSync(chunkDir);
      }

      /* Move chunk to the appropriate directory */
      const chunkDestination = path.join(chunkDir, `chunk_${chunkNumber}`);
      fs.renameSync(chunkPath, chunkDestination);

      res.send(`Chunk ${chunkNumber} uploaded`);
    } catch (err) {
      console.log('Error in uploading file ', err);
      res.status(500).send(err);
    }
  }

  combineFileChunks(res: Response, fileName: string) {
    const chunkDir = path.join(ServerConfig.uploadFolder, 'chunks', fileName);
    const outputFilePath = path.join(ServerConfig.uploadFolder, `${fileName}`);

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
      fs.unlinkSync(chunkPath);
    });

    writeStream.end(() => {
      res.sendFile(outputFilePath, { root: '.' });
      /* Optionally delete chunk directory after merging */
      fs.rmdirSync(chunkDir);
    });

    res.send('File retrieved');
  }

  uploadBase64(
    res: Response,
    fileName: string,
    chunk: Blob,
    chunkNumber: number
  ) {
    try {
      /* create "uploads" folder if not exist */
      const rootDir = path.join(ServerConfig.uploadFolder);
      if (!fs.existsSync(rootDir)) {
        fs.mkdirSync(rootDir);
      }

      /* create "base64" folder if not exist */
      const base64Root = path.join(rootDir, 'base64');
      if (!fs.existsSync(base64Root)) {
        fs.mkdirSync(base64Root);
      }

      /**
       * create folder of the same name as the file and
       * store base64 chunks in text files in this
       * directory
       */
      const base64Dir = path.join(base64Root, fileName);
      if (!fs.existsSync(base64Dir)) {
        fs.mkdirSync(base64Dir);
      }

      /* Move chunk to the appropriate directory */
      const chunkDestination = path.join(base64Dir, `base64_${chunkNumber}.txt`);
      const writeStream = fs.createWriteStream(chunkDestination);
      writeStream.write(chunk);
      writeStream.end();
      res.send(`Base64 file no ${chunkNumber} uploaded`);
    } catch (err) {
      console.log('Error in uploading file ', err);
      res.status(500).send(err);
    }
  }

  combineBase64Files(res: Response, fileName: string) {
    const base64Dir = path.join(ServerConfig.uploadFolder, 'base64', fileName);
    const outputFilePath = path.join(ServerConfig.uploadFolder, `${fileName}`);

    const base64Files = fs.readdirSync(base64Dir).sort((a, b) => {
      const aNum = parseInt(a.split('_')[1]);
      const bNum = parseInt(b.split('_')[1]);
      return aNum - bNum;
    });

    const writeStream = fs.createWriteStream(outputFilePath);

    base64Files.forEach(base64File => {
      const chunkPath = path.join(base64Dir, base64File);
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
