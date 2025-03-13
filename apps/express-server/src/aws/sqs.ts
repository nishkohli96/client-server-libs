/* https://www.npmjs.com/package/@aws-sdk/client-sqs */

import {
  SQSClient,
  ListQueuesCommand,
  SendMessageCommand,
  SendMessageCommandInput,
  ReceiveMessageCommand,
  ReceiveMessageCommandInput,
  SendMessageBatchCommandInput,
} from '@aws-sdk/client-sqs';
import { winstonLogger } from '@/middleware';
import { printObject } from '@/utils';

export const sqsClient = new SQSClient();

/**
 * Just like other list operations, this also supports fetching
 * records in batches using "QueueNamePrefix", "NextToken" and
 * "MaxResults" input props.
 * Retuns QueueURLs like,
 *
 * "QueueUrls": [
 *   "https://sqs.ap-south-1.amazonaws.com/accountId/QueueName"
 * ]
 */
export async function listQueues() {
  try {
    const command = new ListQueuesCommand();
    const response = await sqsClient.send(command);
    winstonLogger.info(`SQS queues list: ${printObject(response)}`);
  } catch (err) {
    winstonLogger.error('Failed to send custom verification email:', err);
  }
}

/**
 * SQS MessageAttributeValue is used to send additional
 * metadata with a message. Each attribute consists of:
 * - DataType → Specifies if the value is a String, Number, or Binary.
 * - StringValue / BinaryValue / NumberValue → The actual attribute value.
 */
export async function sendMessagetoQueue(
  queueUrl: string,
  messageBody: string
) {
  const input: SendMessageCommandInput = {
    QueueUrl: queueUrl,
    MessageBody: messageBody,
    DelaySeconds: 0,
    MessageAttributes: {
      UserId: {
        DataType: 'String',
        StringValue: 'user_123'
      },
      OrderAmount: {
        DataType: 'Number',
        StringValue: '99.99'
      }
    }
  };

  try {
    const command = new SendMessageCommand(input);
    const response = await sqsClient.send(command);
    console.log('Message sent successfully:', response);
  } catch (error) {
    console.error('Error sending message:', error);
  }
}

export async function receiveMessagesFromQueue(queueUrl: string) {
  try {
    const input: ReceiveMessageCommandInput = {
      QueueUrl: queueUrl,
      MaxNumberOfMessages: 10,
      VisibilityTimeout: 30,
      WaitTimeSeconds: 30,
    };
    const command = new ReceiveMessageCommand(input);
    const response = await sqsClient.send(command);
    console.log('Message(s) received successfully:', response);
  } catch (error) {
    console.error('Error receiving message(s):', error);
  }
}
