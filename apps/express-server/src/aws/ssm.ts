/* https://www.npmjs.com/package/@aws-sdk/client-ssm */

import { SSMClient, GetParametersByPathCommand } from '@aws-sdk/client-ssm';
import { winstonLogger } from '@/middleware';

export const ssm = new SSMClient();

/**
 * Store all environment variables in "AWS Systems Manager > Parameter Store",
 * and dynamically load them when hosting your app on cloud or VM. Only
 * use env variables from .env file when developing locally.
 */
export async function loadSSMParameters(envName: string) {
  try {
    const command = new GetParametersByPathCommand({
      Path: envName,
      WithDecryption: true,
      Recursive: true,
    });
    const response = await ssm.send(command);
    if (response.Parameters) {
      response.Parameters.forEach(param => {
        if (param.Name && param.Value) {
          /**
					 * Extract key from "/dev/API_KEY" => "API_KEY"
					 * The key extraction logic may depend on what naming
					 * conventions have your environment variables have been
					 * named in Parameter Store.
					 */
          const key = param.Name.split('/').pop();
          if (key) {
            process.env[key] = param.Value;
          }
        }
      });
      winstonLogger.info('SSM parameters loaded successfully!');
    }
  } catch (error) {
    winstonLogger.error('Error loading SSM parameters:', error);
  }
}
