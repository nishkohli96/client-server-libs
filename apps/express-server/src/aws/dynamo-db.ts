/* https://www.npmjs.com/package/@aws-sdk/client-dynamodb */

import {
  DynamoDBClient,
  PutItemCommand,
  PutItemCommandInput,
  GetItemCommand,
  GetItemCommandInput,
  QueryCommand,
  QueryCommandInput,
  UpdateItemCommand,
  UpdateItemCommandInput,
  DeleteItemCommand,
  DeleteItemCommandInput,
  AttributeValue
} from '@aws-sdk/client-dynamodb';
import { winstonLogger } from '@/middleware';
import { printObject } from '@/utils';

export const dynamoDBClient = new DynamoDBClient();

export async function putRecordInDynamoDB(
  tableName: string,
  record: Record<string, AttributeValue>
) {
  try {
    const input: PutItemCommandInput = {
      TableName: tableName,
      Item: record
    };
    const command = new PutItemCommand(input);
    const response = await dynamoDBClient.send(command);
    winstonLogger.info(`Response after inserting record into table "${tableName}": ${printObject(response)}`);
  } catch (error) {
    winstonLogger.error('Error inserting record into table:', error);
    throw error;
  }
}

/**
 * Get Item (Fetch Single Record by Primary Key)
 * "Key": {
 *   "Artist": {
 *     "S": "Acme Band"
 *   },
 *   "SongTitle": {
 *     "S": "Happy Day"
 *   }
 * },
 *
 * To fetch multiple records, use BatchGetItemCommand
 * with keys as an array of the objects similar to the
 * one above.
 */
export async function getRecordOfDynamoDB(
  tableName: string,
  record: Record<string, AttributeValue>
) {
  try {
    const input: GetItemCommandInput = {
      TableName: tableName,
      Key: record
    };
    const command = new GetItemCommand(input);
    const response = await dynamoDBClient.send(command);
    winstonLogger.info(`Fetched record from table "${tableName}": ${printObject(response)}`);
  } catch (error) {
    winstonLogger.error('Error fetching record from table:', error);
    throw error;
  }
}

/**
 * ScanCommand reads every item in the table, but its usage
 * should be avoided. Prefer Query for better performance
 * when you have known keys.
 */
export async function queryDynamoDBRecords(
  tableName: string,
) {
  try {
    const input: QueryCommandInput = {
      TableName: tableName,
      ExpressionAttributeValues: {
        ':v1': {
          S: 'No One You Know'
        }
      },
      KeyConditionExpression: 'Artist = :v1',
      AttributesToGet: ['artistId', 'Artist'],
    };
    const command = new QueryCommand(input);
    const response = await dynamoDBClient.send(command);
    winstonLogger.info(`Fetched records from table "${tableName}": ${printObject(response)}`);
  } catch (error) {
    winstonLogger.error('Error fetching records from table:', error);
    throw error;
  }
}

/**
 * To update and/or delete multiple items in one go, use
 * BatchWriteItemCommand.
 */
export async function updateDynamoDBRecords(
  tableName: string,
) {
  try {
    const input: UpdateItemCommandInput = {
      TableName: tableName,
      Key: {
        productId: { S: '12345' }
      },
      UpdateExpression: 'SET price = :price',
      ExpressionAttributeValues: {
        ':price': { N: '179.99' }
      },
      ReturnValues: 'ALL_NEW'
    };
    const command = new UpdateItemCommand(input);
    const response = await dynamoDBClient.send(command);
    winstonLogger.info(`Updated record response: ${printObject(response)}`);
  } catch (error) {
    winstonLogger.error('Error to update record from table:', error);
    throw error;
  }
}

export async function deleteDynamoDBRecords(
  tableName: string,
) {
  try {
    const input: DeleteItemCommandInput = {
      TableName: tableName,
      Key: {
        productId: { S: '12345' }
      },
    };
    const command = new DeleteItemCommand(input);
    const response = await dynamoDBClient.send(command);
    winstonLogger.info(`Deleted record response: ${printObject(response)}`);
  } catch (error) {
    winstonLogger.error('Error to delete record from table:', error);
    throw error;
  }
}
