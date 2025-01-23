import { Request, Response, Router } from 'express';
import { ExpressServerEndpoints } from '@csl/react-express';
import { ENV_VARS } from '@/app-constants';
import stytchService from './service';
import * as StytchTypes from './types';

const stytchRouter = Router();
const subRoutes = ExpressServerEndpoints.stytch.subRoutes;

/* POST: /stytch/add-member */
stytchRouter.post(
  `/${subRoutes.addMember}`,
  async (req: Request<object, object, StytchTypes.CreateMemberBody>, res: Response) => {
    return await stytchService.addMember(res, req.body);
  }
);

/* GET: /stytch/get-member */
stytchRouter.get(
  `/${subRoutes.getMember}/:memberId`,
  async (req: Request<StytchTypes.GetMember>, res: Response) => {
    return await stytchService.getMember(res, req.params.memberId);
  }
);

/* PATCH: /stytch/update-member */
stytchRouter.patch(
  `/${subRoutes.updateMember}/:memberId`,
  async (req: Request<StytchTypes.GetMember, object, StytchTypes.CreateMemberBody>, res: Response) => {
    return await stytchService.updateMember(res, req.params.memberId, req.body);
  }
);

/* DELETE: /stytch/unlink-email */
stytchRouter.delete(
  `/${subRoutes.unlinkEmail}/:memberId`,
  async (req: Request<StytchTypes.GetMember, object, StytchTypes.EmailPayload>, res: Response) => {
    return await stytchService.unlinkEmail(res, req.params.memberId, req.body);
  }
);

/* DELETE: /stytch/delete-member */
stytchRouter.delete(
  `/${subRoutes.deleteMember}/:memberId`,
  async (req: Request<StytchTypes.GetMember>, res: Response) => {
    return await stytchService.deleteMember(res, req.params.memberId);
  }
);

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

/* POST: /stytch/sms-otp */
stytchRouter.post(
  `/${subRoutes.smsOTP}`,
  async (req: Request, res: Response) => {
    return await stytchService.sendSMSOtp(res);
  }
);

/* POST: /stytch/email-otp */
stytchRouter.post(
  `/${subRoutes.emailOTP}`,
  async (req: Request, res: Response) => {
    return await stytchService.sendOtp(res);
  }
);

/* POST: /stytch/reset-password */
stytchRouter.post(
  `/${subRoutes.resetPassword}`,
  async (
		req: Request<object, object, StytchTypes.EmailPayload>,
		res: Response
	) => {
		const reqBody = req.body;
    return await stytchService.resetPassword(res, reqBody);
  }
);

/* POST: /stytch/authenticate/with-password */
stytchRouter.post(
  `/${subRoutes.authenticatePassword}`,
  async (
		req: Request<object, object, StytchTypes.UserLogin>,
		res: Response
	) => {
		const reqBody = req.body;
    return await stytchService.loginWithPassword(res, reqBody);
  }
);

/* POST: /stytch/password-strength */
stytchRouter.post(
  `/${subRoutes.passwordStrength}`,
  async (
		req: Request<object, object, StytchTypes.PasswordStrengthBody>,
		res: Response
	) => {
		const reqBody = req.body;
    return await stytchService.checkPasswordStrength(res, reqBody);
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
