import { Request } from 'express';

export interface UploadMediaBody {
  media: File
}

export type UploadMediaRequest = Request<object, object, UploadMediaBody>
