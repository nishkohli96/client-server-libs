# [SendRawEmail](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/client/ses/command/SendRawEmailCommand/)

```js
import { SESClient, SendRawEmailCommand } from '@aws-sdk/client-ses';
import fs from 'fs';
import path from 'path';

const sesClient = new SESClient({ region: 'ap-south-1' });

const sendEmailWithAttachment = async () => {
  // Load PDF file
  const pdfFilePath = path.join(__dirname, 'sample.pdf');
  const pdfFileData = fs.readFileSync(pdfFilePath).toString('base64');

  // Build raw email message with MIME format
  const rawEmail = `
From: "MyApp" <no-reply@yourdomain.com>
To: recipient@example.com
Subject: Welcome to MyApp - Your Guide
MIME-Version: 1.0
Content-Type: multipart/mixed; boundary="NextPart"

--NextPart
Content-Type: text/html; charset="UTF-8"
Content-Transfer-Encoding: 7bit

<html>
<body>
<h2>Welcome to MyApp!</h2>
<p>Hi there,</p>
<p>Attached is your welcome guide in PDF format.</p>
<p>Thanks,<br/>MyApp Team</p>
</body>
</html>

--NextPart
Content-Type: application/pdf; name="WelcomeGuide.pdf"
Content-Transfer-Encoding: base64
Content-Disposition: attachment; filename="WelcomeGuide.pdf"

${pdfFileData}

--NextPart--
`.trim();

  const command = new SendRawEmailCommand({
    RawMessage: {
      Data: Buffer.from(rawEmail)
    }
  });

  try {
    const response = await sesClient.send(command);
    console.log('Email sent successfully:', response);
  } catch (error) {
    console.error('Failed to send email:', error);
  }
};

sendEmailWithAttachment();
```

⚠️ Key Notes
- MIME boundary (`NextPart`) is required.
- Each section (HTML body, attachment) is separated by `--NextPart`.
- `Content-Transfer-Encoding: base64` is required for attachments.
- The **file content must be encoded in Base64**.
- Make sure you have proper permissions (SES **"SendRawEmail"** permission in IAM).