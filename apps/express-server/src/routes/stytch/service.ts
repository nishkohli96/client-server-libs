import { Response } from 'express';
import * as Stytch from '@/stytch';
import { sendErrorResponse } from '@/utils';

class StytchService {
  /**
   * Need to add Allowed domains in organization settings,
   * that allow invites or JIT provisioning for new Members.
   * Gmail domain is not supported, so the stytch response
   * will yield a 400 status code.
   */
  async sendSignInEmail(res: Response) {
    try {
      const params = {
        email_address: Stytch.stytchTestEmail,
        organization_id: Stytch.stytchOrgId
      };
      const response =
        await Stytch.stytchClient.magicLinks.email.loginOrSignup(params);

      return res.status(200).json({
        success: true,
        status: 200,
        message: 'Sent organization sign-in email.',
        data: response
      });
    } catch (error) {
      return sendErrorResponse(res, error, 'Error sending sign-in email');
    }
  }

  async sendDiscoveryEmail(res: Response, redirectURL: string) {
    try {
      const params = {
        email_address: Stytch.stytchTestEmail,
        discovery_redirect_url: redirectURL
      };
      const response =
        await Stytch.stytchClient.magicLinks.email.discovery.send(params);

      return res.status(200).json({
        success: true,
        status: 200,
        message: 'Sent discovery email.',
        data: response
      });
    } catch (error) {
      return sendErrorResponse(res, error, 'Error sending discovery email');
    }
  }

  /**
   * Make sure to configure the redirect URL in the Stytch dashboard.
   * https://stytch.com/dashboard/redirect-urls
   *
   * After clicking on the magic link, the user will be redirected to the
   * redirect endpointURL with the following query parameters:
   *
   * [endpointURL]?stytch_redirect_type=login&stytch_token_type=discovery&token=E3hMn4EzDqOcDfzKG-IKGULZfANc3PDYRyV9RxRMpu8v
   *
   * The token can be used for user authentication, check below
	 * https://stytch.com/docs/b2b/api/authenticate-discovery-magic-link
   */
  magicLinkRedirect(res: Response) {
    return res.status(200).json({
      success: true,
      status: 200,
      message: 'Discovery email redirect successful.'
    });
  }

	async sendOtp(res: Response) {
		try {
			const params = {
				email_address: Stytch.stytchTestEmail,
			};
			const response = await Stytch.stytchClient.otps.email.discovery.send(params);

			return res.status(200).json({
				success: true,
				status: 200,
				message: 'Sent email OTP.',
				data: response
			});
		} catch (error) {
			return sendErrorResponse(res, error, 'Error sending email OTP');
		}
	}

	/**
	 * The response of this API also returns intermediate_session_token
	 */
	async verifyOtp(res: Response, otp: string) {
		try {
			const params = {
				email_address: Stytch.stytchTestEmail,
				code: otp
			};
			const response = await Stytch.stytchClient.otps.email.discovery.authenticate(params);

			return res.status(200).json({
				success: true,
				status: 200,
				message: 'Verified email OTP.',
				data: response
			});
		} catch (error) {
			return sendErrorResponse(res, error, 'Error verifying email OTP');
		}
	}
}

export default new StytchService();
