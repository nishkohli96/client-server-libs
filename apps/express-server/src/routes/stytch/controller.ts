import { Request, Response, Router } from 'express';
import { ExpressServerEndpoints } from '@csl/react-express';
import { ENV_VARS } from '@/app-constants';
import stytchService from './service';

const stytchRouter = Router();
const subRoutes = ExpressServerEndpoints.stytch.subRoutes;

/* POST: /stytch/org-signin  */
stytchRouter.post(
	`/${subRoutes.orgSignIn}`,
	async (req: Request, res: Response) => {
		return await stytchService.sendSignInEmail(res);
	}
);

/* POST: /stytch/discovery-email  */
stytchRouter.post(
	`/${subRoutes.discoveryEmail}`,
	async (req: Request, res: Response) => {
		const redirectURL = `${ENV_VARS.domain}${ExpressServerEndpoints.apiPrefix}${ExpressServerEndpoints.stytch.rootPath}/${subRoutes.discoveryRedirect}`;
		return await stytchService.sendDiscoveryEmail(res, redirectURL);
	}
);

/* GET: /stytch/discovery-redirect  */
stytchRouter.get(
	`/${subRoutes.discoveryRedirect}`,
	(req: Request, res: Response) => {
		return stytchService.discoveryRedirect(res);
	}
);

export { stytchRouter };