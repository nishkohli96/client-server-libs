import type { Request, Response } from 'express';
import type Stripe from 'stripe';

export type ListFilesBody = Stripe.FileListParams;
export type ListFilesRequest = Request<object, object, ListFilesBody>;
export type ListFilesResponse = Response<
  Stripe.Response<Stripe.ApiList<Stripe.File>>
>;

export type GetFileById = {
  fileId: string;
};
export type GetFileRequest = Request<GetFileById>;
export type GetFileResponse = Response<Stripe.Response<Stripe.File>>;
