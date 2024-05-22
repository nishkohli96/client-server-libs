import { Response } from 'express';

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
}

export default new FileService();
