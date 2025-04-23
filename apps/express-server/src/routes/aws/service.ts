import { type Response } from 'express';
import Papa from 'papaparse';
import { type Readable } from 'stream';
import { ENV_VARS } from '@/constants';
import {
  s3Client,
  createPutPresignedUrl,
  createGetPresignedUrl,
  getS3Object
} from '@/aws';
import { uploadFileToS3 } from '@csl/react-express';
import { sendErrorResponse } from '@/utils';
import type * as AwsTypeDefs from './types';

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

  async uploadCSVFile(res: Response) {
    try {
      const data = [
        { id: 1, name: 'Alice', age: 25 },
        { id: 2, name: 'Bob', age: 30 }
      ];
      const csv = Papa.unparse(data);
      const csvBlob = new Blob([csv], { type: 'text/csv' });

      const fileName = `users_${Date.now()}.csv`;
      const csvFile = new File([csvBlob], fileName, { type: 'text/csv' });

      const preSignedUrl = await createPutPresignedUrl(
        ENV_VARS.aws.s3BucketName,
        fileName
      );
      await uploadFileToS3({
        file: csvFile,
        preSignedUrl
      });
      return res.json({
        success: true,
        status: 200,
        message: `File uploaded to S3 bucket with key: "${fileName}"`,
        data: preSignedUrl
      });
    } catch (error) {
      return sendErrorResponse(res, error, 'Unable to upload csv file');
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
      const readableStream = Body as Readable;
      readableStream.pipe(res);
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
