/* https://www.npmjs.com/package/@aws-sdk/client-sqs */

import {
  SQSClient,
  ListQueuesCommand,
  SendMessageCommand,
  SendMessageCommandInput,
  ReceiveMessageCommand,
  ReceiveMessageCommandInput,
  DeleteMessageCommand,
  DeleteMessageCommandInput,
  SendMessageBatchCommand,
  SendMessageBatchCommandInput,
  DeleteMessageBatchCommandInput,
  DeleteMessageBatchCommand,
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
  messageBody: string | object
) {
  const msgBody = typeof messageBody === 'string'
    ? messageBody
    : JSON.stringify(messageBody);
  const input: SendMessageCommandInput = {
    QueueUrl: queueUrl,
    MessageBody: msgBody,
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
    winstonLogger.info(`Message sent successfully: ${printObject(response)}`);
  } catch (error) {
    winstonLogger.error('Error sending message:', error);
  }
}

export async function receiveMessagesFromQueue(queueUrl: string) {
  try {
    const input: ReceiveMessageCommandInput = {
      QueueUrl: queueUrl,
      MaxNumberOfMessages: 10,
      VisibilityTimeout: 30,
      WaitTimeSeconds: 10,
      MessageAttributeNames: ['All'],
    };
    const command = new ReceiveMessageCommand(input);
    const response = await sqsClient.send(command);

    if (!response.Messages || response.Messages.length === 0) {
      winstonLogger.info('No messages received.');
      return;
    }
    winstonLogger.info(`Message(s) received successfully: ${printObject(response.Messages)}`);
    winstonLogger.info('Now deleting received messages...');

    for (const [idx, msg] of response.Messages.entries()) {
      if (!msg.ReceiptHandle) {
        winstonLogger.warn(`Skipping message ${idx + 1}: No ReceiptHandle found.`);
        continue;
      }

      /**
       * For DeleteMessageBatchCommand, the payload will be of the form:
       *
       * Entries: [
       *  {
       *    Id: "STRING_VALUE",
       *    ReceiptHandle: "STRING_VALUE"
       *  },
       * ],
       */
      const deleteMsgInput: DeleteMessageCommandInput = {
        QueueUrl: queueUrl,
        ReceiptHandle: msg.ReceiptHandle,
      };
      const deleteCommand = new DeleteMessageCommand(deleteMsgInput);
      const deleteResponse = await sqsClient.send(deleteCommand);
      winstonLogger.info(
        `Delete msg response for Message ${idx + 1}: ${printObject(deleteResponse)}`
      );
    }
  } catch (error) {
    winstonLogger.error('Error receiving message(s):', error);
  }
}

/**
 * Send messages in batch, where one batch can send a maximum of
 * 10 entries.
 *
 * When using an SQS FIFO queue, each message within a MessageGroupId
 * must have a unique MessageDeduplicationId. If the MessageGroupId is
 * set, but MessageDeduplicationId is missing, you either need to provide
 * this id or else enable ContentBasedDeduplication setting under the
 * Configuration section of your queue.
 */
export async function sendBatchMessages(
  queueUrl: string,
  numMessages: number = 100,
  isFifo: boolean = false
) {
  const batchSize = 10;
  for (let i = 0; i < numMessages; i += batchSize) {
    const messages = Array.from({ length: batchSize }, (_, index) => ({
      Id: `msg-${i + index + 1}`,
      MessageBody: `Message ${i + index + 1}`,
      /**
       * MessageGroupId is only required for FIFO Queues,
       * will throw an error if sent for standard queue.
       */
      ...(isFifo && { MessageGroupId: `Batch-${index + 1}` })
    }));
    const input: SendMessageBatchCommandInput = {
      QueueUrl: queueUrl,
      Entries: messages,
    };

    try {
      const command = new SendMessageBatchCommand(input);
      const response = await sqsClient.send(command);
      winstonLogger.info(`Batch ${i / batchSize + 1} sent successfully: ${printObject(response)}`);
    } catch (error) {
      winstonLogger.error(`Error sending batch ${i / batchSize + 1}`, error);
    }
  }
}

export async function receiveBatchMessages(
  queueUrl: string,
  numMessages: number = 100
) {
  let totalReceived = 0;

  while (totalReceived < numMessages) {
    const input: ReceiveMessageCommandInput = {
      QueueUrl: queueUrl,
      MaxNumberOfMessages: 10,
      VisibilityTimeout: 30,
      WaitTimeSeconds: 5
    };

    const command = new ReceiveMessageCommand(input);
    const response = await sqsClient.send(command);

    if (!response.Messages || response.Messages.length === 0) {
      winstonLogger.info('No more messages available.');
      break;
    }

    /**
     * There are high chances that even if you have plenty of messages,
     * a single batch may not always return 10 messages only. Sometimes
     * it can also be 6, 8 or 4 messages per batch.
     */
    winstonLogger.info(`Received ${response.Messages.length} messages.`);
    totalReceived += response.Messages.length;
    response.Messages.forEach((msg, idx) =>
      winstonLogger.info(`Message ${idx} body: ${msg.Body}`));

    /* Prepare messages for batch delete */
    const deleteInput: DeleteMessageBatchCommandInput = {
      QueueUrl: queueUrl,
      Entries: response.Messages.map((msg, idx) => ({
        Id: `msg-${totalReceived - (response.Messages?.length ?? 0) + idx + 1}`,
        ReceiptHandle: msg.ReceiptHandle!
      }))
    };
    const deleteCommand = new DeleteMessageBatchCommand(deleteInput);
    await sqsClient.send(deleteCommand);

    console.log(`Deleted ${response.Messages.length} messages.`);
  }
}
