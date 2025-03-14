/* https://www.npmjs.com/package/@aws-sdk/client-sns */

import {
  SNSClient,
  Topic,
  Subscription,
  ListTopicsCommand,
  ListTopicsCommandInput,
  ListSubscriptionsCommand,
  ListSubscriptionsCommandInput
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
