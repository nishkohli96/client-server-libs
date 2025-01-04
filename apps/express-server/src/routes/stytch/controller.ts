import { Request, Response, Router } from 'express';
import { ExpressServerEndpoints } from '@csl/react-express';
import { ENV_VARS } from '@/app-constants';
import stytchService from './service';

const stytchRouter = Router();
const subRoutes = ExpressServerEndpoints.stytch.subRoutes;

/* POST: /stytch/org-signin */
stytchRouter.post(
  `/${subRoutes.orgSignIn}`,
  async (req: Request, res: Response) => {
    return await stytchService.sendSignInEmail(res);
  }
);

/* POST: /stytch/magic-link */
stytchRouter.post(
  `/${subRoutes.magicLinkEmail}`,
  async (req: Request, res: Response) => {
    const redirectURL = `${ENV_VARS.domain}${ExpressServerEndpoints.apiPrefix}${ExpressServerEndpoints.stytch.rootPath}/${subRoutes.magicLinkRedirect}`;
    return await stytchService.sendDiscoveryEmail(res, redirectURL);
  }
);

/* GET: /stytch/discovery-redirect */
stytchRouter.get(
  `/${subRoutes.magicLinkRedirect}`,
  (req: Request, res: Response) => {
    return stytchService.magicLinkRedirect(res);
  }
);

/* POST: /stytch/email-otp */
stytchRouter.post(
  `/${subRoutes.emailOTP}`,
  async (req: Request, res: Response) => {
    return await stytchService.sendOtp(res);
  }
);

/* POST: /stytch/authenticate-email-otp */
stytchRouter.post(
  `/${subRoutes.authenticateEmailOTP}`,
  async (
		req: Request<object, object, { code: string }>,
		res: Response
	) => {
		const otpCode = req.body.code;
    return await stytchService.verifyOtp(res, otpCode);
  }
);

export { stytchRouter };
