import { Request } from 'express';

export type PreSignedUrlQueryParams = {
  fileName: string;
};

export type PreSignedUrlRequest = Request<
  object,
  object,
  object,
  PreSignedUrlQueryParams
>;
