import { Router, Response } from 'express';
import { ExpressServerEndpoints } from '@csl/react-express';
import awsService from './service';
import * as AwsTypeDefs from './types';

const awsRouter = Router();
const subRoutes = ExpressServerEndpoints.aws.subRoutes;

/* GET /aws/presigned-url */
awsRouter.get(
  `/${subRoutes.preSignedUrl}`,
  async (req: AwsTypeDefs.PreSignedUrlRequest, res: Response) => {
    return await awsService.generatePreSignedUrl(res, req.query);
  }
);

export { awsRouter };
