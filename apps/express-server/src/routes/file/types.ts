import { Request } from 'express';

export interface UploadMediaBody {
  media: File
}

export type UploadMediaRequest = Request<object, object, UploadMediaBody>

export type LargeFileBody = {
  chunk: Blob;
  chunkNumber: number;
  fileName: string;
}

export type UploadLargeFileReq = Request<object, object, LargeFileBody>
