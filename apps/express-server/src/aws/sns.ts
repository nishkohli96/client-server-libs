/* https://www.npmjs.com/package/@aws-sdk/client-sns */

import {
  SNSClient,
  type Topic,
  type Subscription,
  ListTopicsCommand,
  type ListTopicsCommandInput,
  ListSubscriptionsCommand,
  type ListSubscriptionsCommandInput,
  PublishBatchCommand,
  type PublishBatchCommandInput,
  type PublishBatchRequestEntry
} from '@aws-sdk/client-sns';
import { winstonLogger } from '@/middleware';
import { printObject } from '@/utils';

export const snsClient = new SNSClient();

async function getSNSTopics(
  topicsArr: Topic[] = [],
  nextToken: string | null = null
) {
  const input: ListTopicsCommandInput = {
    NextToken: nextToken ?? undefined
  };
  const command = new ListTopicsCommand(input);
  const { Topics, NextToken } = await snsClient.send(command);

  if (Topics) {
    topicsArr.push(...Topics);
  }
  if (NextToken) {
    return getSNSTopics(topicsArr, NextToken);
  }
  return topicsArr;
}

export async function listTopics() {
  try {
    const snsTopics = await getSNSTopics();
    winstonLogger.info(`SNS topics list: ${printObject(snsTopics)}`);
  } catch (err) {
    winstonLogger.error('Failed to fetch SNS topics list:', err);
  }
}

/**
 * This would return list of all subscriptions. If you want to get
 * subscriptions for only a particular topic, use "ListSubscriptionsByTopic".
 * const input = {
 *   TopicArn: "STRING_VALUE",
 *   NextToken: "STRING_VALUE",
 * };
 * const command = new ListSubscriptionsByTopicCommand(input);
 */
async function getSNSSubscriptions(
  subscriptions: Subscription[] = [],
  nextToken: string | null = null
) {
  const input: ListSubscriptionsCommandInput = {
    NextToken: nextToken ?? undefined
  };
  const command = new ListSubscriptionsCommand(input);
  const { Subscriptions, NextToken } = await snsClient.send(command);

  if (Subscriptions) {
    subscriptions.push(...Subscriptions);
  }
  if (NextToken) {
    return getSNSSubscriptions(subscriptions, NextToken);
  }
  return subscriptions;
}

export async function listSNSSubscriptions() {
  try {
    const snsTopics = await getSNSSubscriptions();
    winstonLogger.info(`SNS subscriptions list: ${printObject(snsTopics)}`);
  } catch (err) {
    winstonLogger.error('Failed to fetch SNS subscriptions list:', err);
  }
}
/*
 * Similar to SQS FIFO, when using an SNS FIFO topic, each message within
 * a MessageGroupId must have a unique MessageDeduplicationId. If the
 * MessageGroupId is set, but MessageDeduplicationId is missing, you either
 * need to provide this id or else enable ContentBasedDeduplication setting
 * under the Configuration section of your SNS topic.
 */
export async function publishBatchNotifications(
  topicArn: string,
  payload: (string | object)[]
) {
  try {
    const batchEntries: PublishBatchRequestEntry[] = payload.map(
      (item, idx) => {
        const itemValue
          = typeof item === 'string' ? item : JSON.stringify(item);
        return {
          Id: `Notification_${idx + 1}`,
          Message: itemValue,
          Subject: `Notification for Item ${idx + 1}`
        };
      }
    );
    const input: PublishBatchCommandInput = {
      TopicArn: topicArn,
      PublishBatchRequestEntries: batchEntries
    };
    const command = new PublishBatchCommand(input);
    const response = await snsClient.send(command);
    winstonLogger.info(`SNS batch notif response: ${printObject(response)}`);
  } catch (err) {
    winstonLogger.error('Failed to fetch SNS subscriptions list:', err);
  }
}
