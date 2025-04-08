import { type Response } from 'express';
import { stripeSDK } from '@/constants';
import { sendErrorResponse } from '@/utils';
import type * as StripeFileTypedefs from './types';

class StripeFilesService {
  /**
   * https://docs.stripe.com/api/files/list?lang=node
   */
  async listFiles(
    res: StripeFileTypedefs.ListFilesResponse,
    params: StripeFileTypedefs.ListFilesBody
  ): Promise<StripeFileTypedefs.ListFilesResponse> {
    try {
      const files = await stripeSDK.files.list(params);
      return res.status(200).json(files);
    } catch (error) {
      return sendErrorResponse(res, error);
    }
  }

  /**
   * https://docs.stripe.com/api/files/retrieve?lang=node
   *
   * This returns the file object, which contains the file's
   * metadata. The "file.url" field contains the URL to get the
   * file contents which must be authenticated by passing
   * "STRIPE_SECRET_KEY" in the "Authorization: Bearer {key}" header,
   * as these sensitive files are not publicly accessible.
   *
   * To make a file publically accessible, you can create them using
   * fileLink.create() and share the file link to the client.
   */
  async getFile(
    res: StripeFileTypedefs.GetFileResponse,
    params: StripeFileTypedefs.GetFileById
  ): Promise<StripeFileTypedefs.GetFileResponse> {
    try {
      const file = await stripeSDK.files.retrieve(params.fileId);
      return res.status(200).json(file);
    } catch (error) {
      return sendErrorResponse(res, error);
    }
  }
}

const stripeFilesService = new StripeFilesService();
export default stripeFilesService;
