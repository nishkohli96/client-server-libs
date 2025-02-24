/* https://www.npmjs.com/package/@aws-sdk/client-iam */

import {
  IAMClient,
  ListGroupsCommand,
  AddUserToGroupCommand
} from '@aws-sdk/client-iam';
import { ENV_VARS } from '@/app-constants';
import { winstonLogger } from '@/middleware';

const iamClient = new IAMClient({
  credentials: {
    accessKeyId: ENV_VARS.aws.accessKey,
    secretAccessKey: ENV_VARS.aws.accessKeySecret
  }
});

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
    console.log('groupsData: ', groupsData);
  } catch(error) {
    winstonLogger.error('AWS IAM error: ', error);
  }
}
