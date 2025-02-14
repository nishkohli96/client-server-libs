import { Response } from 'express';
import fs from 'fs';
import path from 'path';
import moment from 'moment';
import ffmpeg from 'fluent-ffmpeg';
import { ServerConfig } from '@/app-constants';

class FileService {
  multerDirs = ServerConfig.multer.dirs;

  uploadFile(res: Response, file?: Express.Multer.File) {
    try {
      if (!file) {
        return res.status(400).send('Incorrect file extension');
      }
      return res.send('File Uploaded');
    } catch (err) {
      console.log('Error in uploading file ', err);
      return res.send(err);
    }
  }

  uploadChunks(
    res: Response,
    fileName: string,
    chunkPath: string,
    chunkNumber: number
  ) {
    try {
      const chunkDir = path.join(
        this.multerDirs.upload,
        this.multerDirs.chunk,
        fileName
      );

      /**
       * Create dir if it doesn't exist. if creating
       * "uploads/chunks/abc.mp4", I need to create
       * "uploads/chunks" first, which is done by providing
       * "chunks" as arg in fileUploader('chunks')
       * middleware, otherwise this will fail to create the dir.
       *
       * That's why always use "recursive: true", which creates
       * all directories from start to finish if any of the dirs
       * in between does not exist.
       */
      if (!fs.existsSync(chunkDir)) {
        fs.mkdirSync(chunkDir, { recursive: true });
      }

      /* Move chunk to the appropriate directory */
      const chunkDestination = path.join(chunkDir, `chunk_${chunkNumber}`);
      fs.renameSync(chunkPath, chunkDestination);

      return res.send(`Chunk ${chunkNumber} uploaded`);
    } catch (err) {
      console.log('Error in uploading file ', err);
      res.send(err);
    }
  }

  combineFileChunks(res: Response, fileName: string) {
    const chunkDir = path.join(
      this.multerDirs.upload,
      this.multerDirs.chunk
    );
    const chunkFilesDir = path.join(chunkDir, fileName);
    const outputFilePath = path.join(
      this.multerDirs.upload,
      `${fileName}`
    );

    const chunkFiles = fs.readdirSync(chunkFilesDir).sort((a, b) => {
      const aNum = parseInt(a.split('_')[1]);
      const bNum = parseInt(b.split('_')[1]);
      return aNum - bNum;
    });

    const writeStream = fs.createWriteStream(outputFilePath);

    chunkFiles.forEach(chunkFile => {
      const chunkPath = path.join(chunkFilesDir, chunkFile);
      const data = fs.readFileSync(chunkPath);
      writeStream.write(data);
      /* Delete chunk file(s) after merging */
      fs.unlinkSync(chunkPath);
    });

    writeStream.end(() => {
      res.sendFile(outputFilePath, { root: '.' });
      /* Delete chunk directory after merging */
      fs.rmdirSync(chunkFilesDir);
      fs.rmdirSync(chunkDir);
    });

    return res.send('File retrieved');
  }

  uploadBase64(
    res: Response,
    fileName: string,
    chunk: string,
    chunkNumber: number
  ) {
    try {
      /**
       * create folder of the same name as the file and
       * store base64 chunks in text files in this
       * directory as "uploads/base64/filename".
       */
      const base64Dir = path.join(
        this.multerDirs.upload,
        this.multerDirs.base64,
        fileName
      );
      if (!fs.existsSync(base64Dir)) {
        fs.mkdirSync(base64Dir, { recursive: true });
      }

      /* Decode base64 data */
      const buffer = Buffer.from(chunk, 'base64');

      /* Move chunk to the appropriate directory */
      const chunkDestination = path.join(
        base64Dir,
        `base64_${chunkNumber}.txt`
      );
      fs.writeFileSync(chunkDestination, buffer);
      return res.send(`Base64 file no ${chunkNumber} uploaded`);
    } catch (err) {
      console.log('Error in uploading file ', err);
      res.send(err);
    }
  }

  combineBase64Files(res: Response, fileName: string) {
    const base64Dir = path.join(
      this.multerDirs.upload,
      this.multerDirs.base64
    );
    const base64FilesDir = path.join(base64Dir, fileName);
    const outputFilePath = path.join(
      this.multerDirs.upload,
      `${fileName}`
    );

    const base64Files = fs.readdirSync(base64FilesDir).sort((a, b) => {
      const aNum = parseInt(a.split('_')[1]);
      const bNum = parseInt(b.split('_')[1]);
      return aNum - bNum;
    });

    const writeStream = fs.createWriteStream(outputFilePath);

    base64Files.forEach(base64File => {
      const base64Path = path.join(base64FilesDir, base64File);
      const data = fs.readFileSync(base64Path);
      writeStream.write(data);
      /* Delete file(s) after merging */
      fs.unlinkSync(base64Path);
    });

    writeStream.end(() => {
      /**
       * Delete filename directory after merging. To delete
       * a dir, make sure it is completely empty before
       * deletion, otherwise it will fail.
       */
      fs.rmdirSync(base64FilesDir);
      fs.rmdirSync(base64Dir);
    });

    res.send('File retrieved');
  }

  /**
   * FFmpeg combines vidoes well,but takes a lot of time.
   * It might even be able to combine videos of different
   * formats. Make sure frame sizes of both videos are
   * identical. Better to split and combine videoes using
   * chunks only, else can try for base64.
   */
  combineVideosWithFfmpeg(res: Response) {
    const ffMpeg = ffmpeg();
    let complexFilter = '';
    const start = moment();
    console.log('start', start);

    /**
     * Can read files from a directory and make sure to resolve the path
     * of the videos, and keep a check to ensure that all the files are
     * found.
     */
    const videosArr = [
      '/home/nishant.kohli/client-server-libs/apps/express-server/uploads/fireworks.mov',
      '/home/nishant.kohli/client-server-libs/apps/express-server/uploads/fireworks.mov'
    ];

    try {
      videosArr.forEach((video, idx) => {
        ffMpeg.input(video);
        /* Include video(v) and audio(a) from each file */
        complexFilter += `[${idx}:v][${idx}:a]`;
      });
      complexFilter += `concat=n=${videosArr.length}:v=1:a=1[vv][aa]`;

      ffMpeg
        .complexFilter([complexFilter])
        /* Map the video & audio output */
        .outputOptions(['-map [vv]', '-map [aa]'])
        .output('fireworks-combo.mov')
        .on('start', commandLine => {
          console.log('FFmpeg command: ' + commandLine);
        })
        // .on('error', (err, stdout, stderr) => {
        .on('error', err => {
          console.log('err: ', err);
          return res.status(500).send(err);
        })
        .on('end', () => {
          const end = moment();
          console.log('end: ', end);
          const diff = end.diff(start, 'seconds');
          console.log('diff: ', diff);
          return res.send(`Merged in ${diff} seconds`);
        })
        .run();
    } catch (err) {
      console.log('err: ', err);
      res.send(err);
    }
  }
}

const fileService = new FileService();
export default fileService;
