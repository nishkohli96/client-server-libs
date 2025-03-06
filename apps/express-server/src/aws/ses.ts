import { SESClient, CreateTemplateCommand } from '@aws-sdk/client-ses';
import { emailTemplate } from './email-template';

export const sesClient = new SESClient();

export const createEmailTemplate = async () => {
  const command = new CreateTemplateCommand(emailTemplate);
  try {
    const response = await sesClient.send(command);
    console.log('Template Created:', response);
  } catch (err) {
    console.error('Error Creating Template:', err);
  }
};
