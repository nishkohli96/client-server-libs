/* https://www.npmjs.com/package/@aws-sdk/client-lambda */

import {
  LambdaClient,
  InvokeCommand,
  type InvokeCommandInput
} from '@aws-sdk/client-lambda';
import { winstonLogger } from '@/middleware';
import { printObject } from '@/utils';

export const lambdaClient = new LambdaClient();

/**
 * The Event object in handler function will have the exact
 * payload passed from the "Payload" key in input.
 * The SDK also has a InvokeAsync command, but that is now
 * deprecated.
 */
export async function invokeLambda(functionName: string, payload: object) {
  try {
    const input: InvokeCommandInput = {
      FunctionName: functionName,
      InvocationType: 'Event',
      LogType: 'Tail',
      ClientContext: JSON.stringify({
        ip: '192.168.32.1',
        id: 23293
      }),
      Payload: JSON.stringify(payload)
    };
    const command = new InvokeCommand(input);
    const response = await lambdaClient.send(command);
    winstonLogger.info(
      `Lambda function "${functionName}" invoke response: ${printObject(response)}`
    );
  } catch (error) {
    winstonLogger.error('Error involing Lambda function: ', error);
  }
}
