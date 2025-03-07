/* https://www.npmjs.com/package/@aws-sdk/client-iam */

import {
  IAMClient,
  ListGroupsCommand,
} from '@aws-sdk/client-iam';
import { winstonLogger } from '@/middleware';

const iamClient = new IAMClient();

export async function iamOps() {
  try {
    /**
		 * Lists all the user groups like "admin" created inside
		 * your AWS account.
		 *
		 * While performing IAM ops, if the user or group name does
		 * not exist, an error would be thrown.
		 */
    const listGroupsCommand = new ListGroupsCommand();
    const groupsData = await iamClient.send(listGroupsCommand);
    winstonLogger.info('groupsData: ', groupsData);
  } catch(error) {
    winstonLogger.error('AWS IAM error: ', error);
  }
}
