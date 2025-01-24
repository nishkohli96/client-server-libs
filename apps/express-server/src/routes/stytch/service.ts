import { Response } from 'express';
import * as Stytch from '@/stytch';
import { sendErrorResponse } from '@/utils';
import * as StytchTypes from './types';

class StytchService {
  /**
   * A member, ie a user corresponding to your application must be created
   * to authenticate with Stytch. The member_id and email is a unique identifier.
   * Email is required while other fields are optional. Duplicate email and
   * phone number cannot exist in the same organization.
   * 
   * Read more -
   * https://stytch.com/docs/b2b/api/create-member
   */
  async addMember(res: Response, reqBody: StytchTypes.CreateMemberBody) {
    try {
      const params = {
        organization_id: Stytch.stytchOrgId,
        email_address: reqBody.email,
        name: reqBody.name,
        mfa_phone_number: reqBody.phone
      };
      const response =
        await Stytch.stytchClient.organizations.members.create(params);
      return res.status(200).json({
        success: true,
        status: 200,
        message: 'New member added.',
        data: response
      });
    } catch (error) {
      return sendErrorResponse(res, error, 'Error adding new member');
    }
  }

  /**
   * Get a Member by member_id or email_address. Prefer
   * retrieving by member_id as it always remain constant. 
   */
  async getMember(res: Response, memberId: string) {
    try {
      const params = {
        organization_id: Stytch.stytchOrgId,
        member_id: memberId
        // email_address: reqBody.email,
      };
      const response =
        await Stytch.stytchClient.organizations.members.get(params);
      return res.status(200).json({
        success: true,
        status: 200,
        message: 'Member details retrieved.',
        data: response
      });
    } catch (error) {
      return sendErrorResponse(res, error, 'Error fetching member details');
    }
  }

  /**
   * When updating a member, if their email id is changed, the
   * previous email id will be stored in "retired_email_addresses"
   * field when retrieving the member details. If I try to create a
   * new member with the old email id, it will throw an error. 
   */
  async updateMember(
    res: Response,
    memberId: string,
    reqBody: StytchTypes.CreateMemberBody
  ) {
    try {
      const params = {
        organization_id: Stytch.stytchOrgId,
        member_id: memberId,
        email_address: reqBody.email,
        name: reqBody.name,
        mfa_phone_number: reqBody.phone
      };
      const response =
        await Stytch.stytchClient.organizations.members.update(params);
      return res.status(200).json({
        success: true,
        status: 200,
        message: 'Member details updated.',
        data: response
      });
    } catch (error) {
      return sendErrorResponse(res, error, 'Error updating member details');
    }
  }

  /**
   * Unlinking an email will remove the email from the member's
   * "retired_email_addresses" array.
   * 
   * Instead of using the email address, the email_id can be used.
   * email_id: "email-test-81bf03a8-86e1-4d95-bd44-bb3495224953",
   */
  async unlinkEmail(
    res: Response,
    memberId: string,
    reqBody: StytchTypes.EmailPayload
  ) {
    try {
      const params = {
        organization_id: Stytch.stytchOrgId,
        member_id: memberId,
        email_address: reqBody.email,
      };
      const response =
        await Stytch.stytchClient.organizations.members.unlinkRetiredEmail(params);
      return res.status(200).json({
        success: true,
        status: 200,
        message: 'Member email unlinked.',
        data: response
      });
    } catch (error) {
      return sendErrorResponse(res, error, 'Error unlinking member email');
    }
  }

  async deleteMember(res: Response, memberId: string) {
    try {
      const params = {
        organization_id: Stytch.stytchOrgId,
        member_id: memberId,
      };
      const response =
        await Stytch.stytchClient.organizations.members.delete(params);
      return res.status(200).json({
        success: true,
        status: 200,
        message: 'Member account deleted.',
        data: response
      });
    } catch (error) {
      return sendErrorResponse(res, error, 'Error deleting member');
    }
  }

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

  async resetPassword(res: Response, reqBody: StytchTypes.EmailPayload) {
    try {
      const params = {
        organization_id: Stytch.stytchOrgId,
        email_address: reqBody.email
      };
      const response =
        await Stytch.stytchClient.passwords.email.resetStart(params);

      return res.status(200).json({
        success: true,
        status: 200,
        message: 'Password reset success.',
        data: response
      });
    } catch (error) {
      return sendErrorResponse(res, error, 'Unable to reset password');
    }
  }

  async loginWithPassword(res: Response, reqBody: StytchTypes.UserLogin) {
    try {
      const params = {
        organization_id: Stytch.stytchOrgId,
        email_address: reqBody.email,
        password: reqBody.password
      };
      const response = await Stytch.stytchClient.passwords.authenticate(params);

      return res.status(200).json({
        success: true,
        status: 200,
        message: 'Logged in with password.',
        data: response
      });
    } catch (error) {
      return sendErrorResponse(res, error, 'Error logging in with password');
    }
  }

  /**
   * The response will send a score key whose value will be between 1 and 4,
   * a 3 or greater is required to pass validation.
   */
  async checkPasswordStrength(
    res: Response,
    reqBody: StytchTypes.PasswordStrengthBody
  ) {
    try {
      const params = {
        password: reqBody.password
      };
      const response =
        await Stytch.stytchClient.passwords.strengthCheck(params);

      return res.status(200).json({
        success: true,
        status: 200,
        message: 'Password is strong.',
        data: response
      });
    } catch (error) {
      return sendErrorResponse(res, error, 'Your password is weak');
    }
  }

  /**
   * OTP will automatically be sent to the phone number linked to the
   * memberId. An error will be thrown if the Member already has a phone
   * number and the provided "mfa_phone_number" in req body does not match
   * the existing one. Sending another OTP code before the first has expired
   * will invalidate the first code.
   */
  async sendSMSOtp(res: Response, memberId: string) {
    try {
      const params = {
        organization_id: Stytch.stytchOrgId,
        member_id: memberId
      };
      const response = await Stytch.stytchClient.otps.sms.send(params);

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

  async verifySMSOtp(res: Response, payload: StytchTypes.VerifyCode) {
    try {
      const params = {
        organization_id: Stytch.stytchOrgId,
        member_id: payload.memberId,
        code: payload.code
      };
      const response = await Stytch.stytchClient.otps.sms.authenticate(params);
      return res.status(200).json({
        success: true,
        status: 200,
        message: 'Authenticated email OTP.',
        data: response
      });
    } catch (error) {
      return sendErrorResponse(res, error, 'Error verifying sms OTP');
    }
  }

  async sendOtp(res: Response) {
    try {
      const params = {
        email_address: Stytch.stytchTestEmail
      };
      const response =
        await Stytch.stytchClient.otps.email.discovery.send(params);

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
      const response =
        await Stytch.stytchClient.otps.email.discovery.authenticate(params);

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

  async getRecoveryCodes(res: Response, memberId: string) {
    try {
      const params = {
        organization_id: Stytch.stytchOrgId,
        member_id: memberId
      };
      const response =
        await Stytch.stytchClient.recoveryCodes.get(params);

      return res.status(200).json({
        success: true,
        status: 200,
        message: 'Recovery Codes sent.',
        data: response
      });
    } catch (error) {
      return sendErrorResponse(res, error, 'Unable to generate recovery codes');
    }
  }
}

export default new StytchService();
