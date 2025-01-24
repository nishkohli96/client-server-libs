import { Request } from 'express';

/* File Upload */
export interface UploadMediaBody {
  media: Express.Multer.File
}
export type UploadMediaRequest = Request<object, object, UploadMediaBody>

/* Upload video by splitting into chunks */
export type ChunkUploadBody = {
  chunk: Blob;
  chunkNumber: number;
  fileName: string;
}
export type ChunkUploadReq = Request<object, object, ChunkUploadBody>

/* Upload video as base64 encoded */
export type Base64UploadBody = {
  chunk: string;
  chunkNumber: number;
  fileName: string;
}
export type Base64UploadReq = Request<object, object, Base64UploadBody>

/* Combine Chunks */
export type CombineChunksParam = {
  fileName: string;
}
export type CombineChunksReq = Request<CombineChunksParam>

export type MultiFieldFiles = {
  image: Express.Multer.File[];
  document: Express.Multer.File[]
}
