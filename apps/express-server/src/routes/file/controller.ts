import { Router, Response } from 'express';
import { ExpressServerEndpoints } from '@csl/react-express';
import { ServerConfig } from '@/app-constants';
import { fileUploader } from '@/middleware';
import fileService from './service';
import * as FileTypeDefs from './types';

const fileRouter = Router();
const subRoutes = ExpressServerEndpoints.files.subRoutes;
const multerDirs = ServerConfig.multer.dirs;

const mediaUploader = fileUploader('test-folder/some-dir', ['.jpg', '.jpeg', '.png']);
const chunkUploader = fileUploader(multerDirs.chunk);
const uploader = fileUploader();

/**
 * POST /files/upload
 *
 * Uploading a single file, here "media" in
 * mediaUploader.single is the fieldName of the
 * formData in which the blob is appended.
 */
fileRouter.post(
  `/${subRoutes.upload}`,
  mediaUploader.single('media'),
  function uploadFile(req: FileTypeDefs.UploadMediaRequest, res: Response) {
    const file = req.file;
    return fileService.uploadFile(res, file);
  }
);

/**
 * POST /files/upload-many
 *
 * Uploading multiple files in the same field
 */
fileRouter.post(
  `/${subRoutes.uploadMany}`,
  uploader.array('files', ServerConfig.multer.maxFiles),
  function uploadFile(req: FileTypeDefs.UploadMediaRequest, res: Response) {
    return res.send('Files uploaded successfully');
  }
);

/**
 * POST /files/upload-separate
 *
 * Uploading files in two different fields, say an image
 * and a document. maxCount is the max number of files
 * you expect for each field. Both of these fields will
 * contain an array of files.
 */
fileRouter.post(
  `/${subRoutes.uploadSeparate}`,
  uploader.fields([
    { name: 'image' },
    {
      name: 'document',
      maxCount: 2
    }
  ]),
  function uploadFile(req: FileTypeDefs.UploadMediaRequest, res: Response) {
    const files = req.files as FileTypeDefs.MultiFieldFiles;
    console.log('files: ', files);
    return res.send('Files uploaded successfully');
  }
);

/**
 * Uploading files as chunks
 * Test using react-client on http://localhost:3000/file-uploads route
 */

/**
 * POST /file/upload-chunk
 *
 * Uploading large file by splitting into chunks, and then
 * hitting the combine-file api to get the full file on the
 * server.
 */
fileRouter.post(
  `/${subRoutes.uploadChunk}`,
  chunkUploader.single('chunk'),
  function uploadChunks(req: FileTypeDefs.ChunkUploadReq, res: Response) {
    const { chunkNumber, fileName } = req.body;
    const chunkPath = req.file?.path ?? '';
    return fileService.uploadChunks(
      res,
      fileName,
      chunkPath,
      Number(`${chunkNumber}`)
    );
  }
);

/**
 * POST /file/combine-file
 *
 * Get filename along with the extension in params, combine
 * all the chunks stored from the above endpoint into the
 * resultant file and delete these chunks.
 */
fileRouter.get(
  `/${subRoutes.combineFile}/:fileName`,
  function combineFileChunks(
    req: FileTypeDefs.CombineChunksReq,
    res: Response
  ) {
    const fileName = req.params.fileName;
    return fileService.combineFileChunks(res, fileName);
  }
);

/**
 * POST /files/upload-base64
 *
 * Uploading large file by splitting into chunks and encoding
 * as base64, and then hitting the combine-file api to get the
 * full file on the server.
 *
 * Base64 are sent as strings, somehow no folder is created, even
 * if provided as an argument. If no file is sent in the form data,
 * the destination function inside multer.diskStorage won't be
 * executed, and therefore the folder won't be created
 */
fileRouter.post(
  `/${subRoutes.uploadBase64}`,
  uploader.single('chunk'),
  function uploadBase64(req: FileTypeDefs.Base64UploadReq, res: Response) {
    const { chunkNumber, fileName, chunk } = req.body;
    return fileService.uploadBase64(
      res,
      fileName,
      chunk,
      Number(`${chunkNumber}`)
    );
  }
);

/**
 * POST /files/combine-base64
 *
 * Get filename along with the extension in params, combine
 * all the chunks stored from the above endpoint into the
 * resultant file and delete these chunks.
 *
 * FYI - Ideally the state of the file should be stored somewhere,
 * ie how many chunks received out of the total chunks that should
 * have been sent, once all chunks receive, then the combining file
 * process should take place instead of manually hit an api, since
 * there can be a network interruption on the clients end when uploading
 * to the server.
 */
fileRouter.get(
  `/${subRoutes.combineBase64}/:fileName`,
  function combineBase64Files(
    req: FileTypeDefs.CombineChunksReq,
    res: Response
  ) {
    const fileName = req.params.fileName;
    return fileService.combineBase64Files(res, fileName);
  }
);

/**
 * POST /files/combine-with-ffmpeg
 *
 * Combine videos using ffmpeg. Install ffmpeg by running -
 * git clone https://git.ffmpeg.org/ffmpeg.git ffmpeg
 */
fileRouter.post(
  `/${subRoutes.combineWithffmpeg}`,
  function combineVideosWithFfmpeg(
    req,
    res: Response
  ) {
    return fileService.combineVideosWithFfmpeg(res);
  }
);

/**
 * TODO:
 * 3. put a check to throw err, if say some header not present while fetching these assets.
 * 4. make api to read data from a csv file and send for pagination across react & next apps
 * 5. csv download above data.
 */

export { fileRouter };
