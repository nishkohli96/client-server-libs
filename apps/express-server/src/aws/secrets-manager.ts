/* https://www.npmjs.com/package/@aws-sdk/client-secrets-manager */

import {
  SecretsManagerClient,
  CreateSecretCommand,
  CreateSecretCommandInput,
  GetSecretValueCommand,
  GetSecretValueCommandInput,
  UpdateSecretCommand,
  UpdateSecretCommandInput,
  DeleteSecretCommand,
  DeleteSecretCommandInput,
} from '@aws-sdk/client-secrets-manager';
import { winstonLogger } from '@/middleware';
import { printObject } from '@/utils';

export const secretsManagerClient = new SecretsManagerClient();

/**
 * You can also create secret with mutiple key-values by passing
 * JSON.stringify({ foo: 'bar', age:30 })
 * in the SecretString value.
 *
 * If you call this function on an already existing key, it will
 * throw an error.
 */
export async function createSecret(name: string, value: string | object) {
  const secretValue = typeof value === 'string' ? value : JSON.stringify(value);
  const input: CreateSecretCommandInput = {
    Name: name,
    SecretString: secretValue
  };
  const command = new CreateSecretCommand(input);
  await secretsManagerClient.send(command);
  winstonLogger.info(`Created Secret "${name}" in Secrets Manager.`);
}

function parseValue(value: string): string | Record<string, unknown> {
  try {
    return JSON.parse(value);
  } catch {
    return value;
  }
}

/**
 * Can't perform GET operation on the secret if it
 * has been marked for deletion. This will also throw
 * an error for a non-existant key, which can be caught
 * using, error.name = 'ResourceNotFoundException'
 *
 * Also use DescribeSecretCommand instead to get metadata
 * related to the secretId. This command will NOT return
 * the secret value though.
 */
export async function getSecretValue(name: string) {
  const input: GetSecretValueCommandInput = {
    SecretId: name,
  };
  const command = new GetSecretValueCommand(input);
  const response = await secretsManagerClient.send(command);
  if(!response.SecretString) {
    return null;
  }
  const secretValue = parseValue(response.SecretString);
  winstonLogger.info(`Secret "${name}" , value: ${printObject(secretValue)}`);
  return response.SecretString;
}

/**
 * PutSecretValueCommand: Updates the value of an existing
 *   secret (creates a new version)
 * UpdateSecretCommand: Updates metadata/configurations of a
 *   secret (e.g., KMS key, policy)
 *
 * Also refer RotateSecretCommand:
 * https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/client/secrets-manager/command/RotateSecretCommand/
 */
export async function upsertSecret(secretName: string, secretValue: string | object) {
  try {
    const valueToStore = typeof secretValue === 'string' ? secretValue : JSON.stringify(secretValue);
    const input: UpdateSecretCommandInput = {
      SecretId: secretName,
      SecretString: valueToStore
    };
    const updateCommand = new UpdateSecretCommand(input);

    await secretsManagerClient.send(updateCommand);
    winstonLogger.info(`Secret "${secretName}" updated successfully.`);
  } catch (error) {
    if (error instanceof Error && error.name === 'ResourceNotFoundException') {
      winstonLogger.info(`Secret "${secretName}" not found. Creating a new one...`);
      await createSecret(secretName, secretValue);
      winstonLogger.info(`Secret "${secretName}" created successfully.`);
    } else {
      winstonLogger.error('Error upserting secret:', error);
    }
  }
}

export async function deleteSecret(name: string) {
  const input: DeleteSecretCommandInput = {
    SecretId: name,
  };
  const command = new DeleteSecretCommand(input);
  await secretsManagerClient.send(command);
  winstonLogger.info(`Deleted Secret "${name}" in Secrets Manager.`);
}

