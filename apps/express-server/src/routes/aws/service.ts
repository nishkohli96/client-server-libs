import { Response } from 'express';
import * as AwsTypeDefs from './types';
import { createPresignedUrl } from '@/aws';
import { ENV_VARS } from '@/app-constants';
import { sendErrorResponse } from '@/utils';

class AwsService {
  async generatePreSignedUrl(
    res: Response,
    queryParams: AwsTypeDefs.PreSignedUrlQueryParams
  ) {
    try {
      const preSignedUrl = await createPresignedUrl(
        ENV_VARS.aws.s3BucketName,
        queryParams.fileName
      );
      return res.json({
        success: true,
        status: 200,
        message: 'Pre-signed url generated.',
        data: preSignedUrl
      });
    } catch (error) {
      return sendErrorResponse(res, error, 'Unable to get purchase history');
    }
  }
}

const awsService = new AwsService();
export default awsService;
