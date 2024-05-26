import { Request } from 'express';

/* File Upload */
export interface UploadMediaBody {
  media: File
}
export type UploadMediaRequest = Request<object, object, UploadMediaBody>

/* Upload chunks */
export type LargeFileBody = {
  chunk: Blob;
  chunkNumber: number;
  fileName: string;
}
export type UploadLargeFileReq = Request<object, object, LargeFileBody>

/* Combine Chunks */
export type CombineChunksParam = {
  fileName: string;
}
export type CombineChunksReq = Request<CombineChunksParam>

export type MultiFieldFiles = {
  image: Express.Multer.File[];
  document: Express.Multer.File[]
}
