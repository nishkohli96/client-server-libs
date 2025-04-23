/**
 * If you need to create a json file for direcly upload via
 * CLI, the TemplateContent string must be in a single line,
 * similar to the simple-email-template.json.
 * For the sake of readability, I've created tenplates in ts file.
 *
 * 🔗 {{verification_link}} Placeholder
 * AWS automatically replaces {{verification_link}} with a unique
 * link that:
 * - Tracks verification.
 * - Marks the email as verified when clicked.
 * - Redirects to the success or failure URL you provided.
 *
 * SuccessRedirectionURL && FailureRedirectionURL must be publicly
 * accessible URLs. So http://localhost:3000 will not work.
 *
 * If you're testing locally, set use a tunnel service like
 * ngrok (e.g., https://abcd1234.ngrok.io/success)
 */

import { type CreateCustomVerificationEmailTemplateCommandInput } from '@aws-sdk/client-ses';

export const emailVerificationTemplate: CreateCustomVerificationEmailTemplateCommandInput
  = {
    TemplateName: 'UserVerificationTemplate',
    FromEmailAddress: 'no-reply@yourdomain.com',
    TemplateSubject: 'Verify your email',
    TemplateContent:
      '<html>\n\
			<body style=\'font-family: Arial, sans-serif;\'>\n\
					<h2>Welcome to MyApp!</h2>\n\
					<p>Hello Friend,</p>\n\
					<p>Thanks for signing up. Please confirm your email address by clicking the button below:</p>\n\
					<div style=\'padding:10px;background-color:#f0f0f0;border:1px solid #ccc;\'>\n\
                <strong>{{verification_link}}</strong>\n\
            </div>\n\
					<p>Or copy and paste this link in your browser.<p>\n\
					<p>If you didn\'t sign up, please ignore this email.</p>\n\
					<p>Thanks,<br>The MyApp Team</p>\n\
					<p style=\'font-size:12px;color:#888;\'>If the button above doesn\'t work, copy and paste this link into your browser:<br>{{verification_link}}</p>\n\
			</body>\n\
	</html>',
    SuccessRedirectionURL: 'https://www.google.com/',
    FailureRedirectionURL: 'https://yourapp.com/verification-failed'
  };
