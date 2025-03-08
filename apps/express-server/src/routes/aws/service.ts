import { Response } from 'express';
import * as AwsTypeDefs from './types';
import {
  s3Client,
  createPutPresignedUrl,
  createGetPresignedUrl,
  getS3Object
} from '@/aws';
import { ENV_VARS } from '@/app-constants';
import { sendErrorResponse } from '@/utils';

class AwsService {
  async getUploadPreSignedUrl(
    res: Response,
    queryParams: AwsTypeDefs.PreSignedUrlQueryParams
  ) {
    try {
      const preSignedUrl = await createPutPresignedUrl(
        ENV_VARS.aws.s3BucketName,
        queryParams.fileName
      );
      return res.json({
        success: true,
        status: 200,
        message: 'Upload pre-signed url generated.',
        data: preSignedUrl
      });
    } catch (error) {
      return sendErrorResponse(
        res,
        error,
        'Unable to generate upload pre-signed url'
      );
    }
  }

  async getDownloadPreSignedUrl(
    res: Response,
    queryParams: AwsTypeDefs.PreSignedUrlQueryParams
  ) {
    try {
      const preSignedUrl = await createGetPresignedUrl(
        ENV_VARS.aws.s3BucketName,
        queryParams.fileName
      );
      return res.json({
        success: true,
        status: 200,
        message: 'Download pre-signed url generated.',
        data: preSignedUrl
      });
    } catch (error) {
      return sendErrorResponse(
        res,
        error,
        'Unable to generate download pre-signed url'
      );
    }
  }

  async downloadFile(
    res: Response,
    queryParams: AwsTypeDefs.PreSignedUrlQueryParams
  ) {
    try {
      const { Body, ContentType, ContentLength } = await s3Client.send(
        getS3Object(ENV_VARS.aws.s3BucketName, queryParams.fileName)
      );
      if (!Body) {
        return sendErrorResponse(res, undefined, 'File not found', 404);
      }

      /* Set response headers to send as an attachment */
      res.setHeader(
        'Content-Disposition',
        `attachment; filename="${queryParams.fileName}"`
      );
      res.setHeader('Content-Type', ContentType || 'application/octet-stream');
      res.setHeader('Content-Length', ContentLength || 0);
    } catch (error) {
      return sendErrorResponse(
        res,
        error,
        'Unable to generate download pre-signed url'
      );
    }
  }
}

const awsService = new AwsService();
export default awsService;
