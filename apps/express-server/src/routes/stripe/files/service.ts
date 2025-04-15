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
   * fileLinks.create() and share the file link to the client.
   *
   * Refer the "createFileLink" method below.
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

  /**
   * This method creates a public url for the given file ID with
   * an expiry of 1 day, and can be used to extend the above method.
   * Expired links can no longer be updated.
   *
   * "res.redirect(fileLink.url)" -> redirects the user to the file
   * link thus viewing file contents to the user.
   *
   * "res.json(fileLink.url)" -> returns the file url
   */
  async createFileLink(fileId: string) {
    const expires_at = Math.floor(Date.now() / 1000) + 60 * 60 * 24;
    const fileLink = await stripeSDK.fileLinks.create({
      file: fileId,
      expires_at
    });
    return fileLink.url;
  }
}

const stripeFilesService = new StripeFilesService();
export default stripeFilesService;
