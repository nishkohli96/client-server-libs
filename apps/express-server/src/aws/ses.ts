/* https://www.npmjs.com/package/@aws-sdk/client-ses */

import {
  SESClient,
  CreateTemplateCommand,
  VerifyEmailIdentityCommand,
  VerifyEmailAddressCommandInput,
  SendBulkTemplatedEmailCommand,
  SendBulkTemplatedEmailCommandInput,
  CreateCustomVerificationEmailTemplateCommand,
  SendCustomVerificationEmailCommand,
  SendCustomVerificationEmailCommandInput
} from '@aws-sdk/client-ses';
import { winstonLogger } from '@/middleware';
import { printObject } from '@/utils';
import { emailTemplate, emailVerificationTemplate } from './assets';

export const sesClient = new SESClient();

export async function createEmailTemplate() {
  try {
    /**
     * This function will throw an error if the templateName
     * already exists. In that case, use UpdateTemplateCommand
     * method instead.
     */
    const command = new CreateTemplateCommand(emailTemplate);
    const response = await sesClient.send(command);
    winstonLogger.info(`Template Created: ${printObject(response)}`);
  } catch (err) {
    winstonLogger.error('Error Creating Template:', err);
  }
}

/**
 * All email and domai identities must be verified before you use
 * them to send email in Amazon SES, esp in the sandbox mode.
 *
 * This will send the default verification email template to the
 * recipient. They however need to verify their email address by
 * manually clicking on the verifyEmail link before receiving any
 * further emails from the sender.
 */
export async function verifyEmailAddress() {
  try {
    const input: VerifyEmailAddressCommandInput = {
      EmailAddress: 'hello@gmail.com'
    };
    const command = new VerifyEmailIdentityCommand(input);
    const response = await sesClient.send(command);
    winstonLogger.info(`Verify email result: ${printObject(response)}`);
  } catch (err) {
    winstonLogger.error('Error verifying email address:', err);
  }
}

export async function createCustomEmailVerifyTemplate() {
  try {
    const command = new CreateCustomVerificationEmailTemplateCommand(
      emailVerificationTemplate
    );
    const response = await sesClient.send(command);
    winstonLogger.info(`Created custom email verify template: ${printObject(response)}`);
  } catch (err) {
    winstonLogger.error('Unable to create custom email verify template:', err);
  }
}

/**
 * Production access is required before sending custom verification
 * emails.
 * {{verification_link}} is the only allowed variable in Custom Verification
 * Emails for AWS SES. You cannot pass custom variables in these templates.
 */
export async function sendCustomVerificationEmail() {
  try {
    const input: SendCustomVerificationEmailCommandInput = {
      TemplateName: 'UserVerificationTemplate',
      EmailAddress: 'welcome.user@gmail.com',
    };
    const command = new SendCustomVerificationEmailCommand(input);
    const response = await sesClient.send(command);
    winstonLogger.info(`Created custom email verify template: ${printObject(response)}`);
  } catch (err) {
    winstonLogger.error('Failed to send custom verification email:', err);
  }
}

export async function sendBulkEmails() {
  try {
    const bulkEmailTemplateInput: SendBulkTemplatedEmailCommandInput = {
      Source: 'welcome@gmail.com',
      Template: 'WelcomeTemplate',
      DefaultTemplateData: JSON.stringify({
        personName: 'John Doe',
        appName: 'Sample SES App'
      }),
      Destinations: [
        {
          Destination: {
            ToAddresses: ['hello@gmail.com']
            // CcAddresses: [],
            // BccAddresses: [].
          },
          ReplacementTemplateData: JSON.stringify({
            personName: 'Person 1',
            appName: 'Aws SES'
          })
        },
        {
          Destination: {
            ToAddresses: ['hello.again@gmail.com']
          },
          ReplacementTemplateData: JSON.stringify({
            personName: 'Person 2',
            appName: 'Aws SES App'
          })
        }
      ]
    };
    const command = new SendBulkTemplatedEmailCommand(bulkEmailTemplateInput);
    const response = await sesClient.send(command);
    winstonLogger.info(`Bulk emails sent: ${printObject(response)}`);
  } catch (err) {
    winstonLogger.error('Error sending bulk emails:', err);
  }
}
