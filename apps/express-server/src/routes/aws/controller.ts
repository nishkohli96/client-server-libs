import { Router, Request, Response } from 'express';
import { ExpressServerEndpoints } from '@csl/react-express';
import awsService from './service';
import * as AwsTypeDefs from './types';

const awsRouter = Router();
const subRoutes = ExpressServerEndpoints.aws.subRoutes;

/* GET /aws/upload-presigned-url */
awsRouter.get(
  `/${subRoutes.uploadPreSignedUrl}`,
  async (req: AwsTypeDefs.PreSignedUrlRequest, res: Response) => {
    return await awsService.getUploadPreSignedUrl(res, req.query);
  }
);

/* GET /aws/download-presigned-url */
awsRouter.get(
  `/${subRoutes.downloadPreSignedUrl}`,
  async (req: AwsTypeDefs.PreSignedUrlRequest, res: Response) => {
    return await awsService.getDownloadPreSignedUrl(res, req.query);
  }
);

/* POST /aws/upload-csv-file */
awsRouter.post(
  `/${subRoutes.uploadCSVFile}`,
  async (_, res: Response) => {
    return await awsService.uploadCSVFile(res);
  }
);

/* GET /aws/download-file */
awsRouter.get(
  `/${subRoutes.downloadFile}`,
  async (req: AwsTypeDefs.PreSignedUrlRequest, res: Response) => {
    return await awsService.downloadFile(res, req.query);
  }
);

export { awsRouter };
