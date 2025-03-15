## Containers on AWS

-  **Amazon Elastic Container Service (ECS)** - for docker containers
-  **Amazon Elastic Kubernetes Service (EKS)** - Amazon's managed Kubernetes
-  **AWS Fargate**, amazon's own serverless container platform that works with ECS and with EKS
-  **Amazon ECR**: Store container images

## Lambda

1.  A lambda function can support upto 1000 current executions, which means all the lambda functions in your account can have a combined concurrent executions at a maximum limit of 1000, which can be increased by contacting the support.

2.  You can set a "reserved concurrency" at the function level and any invocation over the concurrency level will trigger a "throttle".

3.  Throttle behaviour
    - If synchronous invocation => return ThrottleError - 429
	  - If async invocation => retry automatically and then go to Dead Letter Queue (DLQ).

4.  If lambda functions directly access your database, they may open too many connections under high load. Hence we use a RDS Proxy by pooling and sharing DB connections. It also enforces security by enforcing IAM uthentication and storing credentials in Secrets Manager.

5.  The lambda function must be deployed in your VPC, because RDS Proxy is never publically accessible.


## DynamoDB

1.  Use the following policy when creating a dynamoDB table or refer the [DynamoDB resource based policy examples](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/rbac-examples.html).
    ```
		{
      "Version": "2012-10-17",
      "Statement": [
        {
          "Effect": "Allow",
          "Principal": {
            "AWS": "arn:aws:iam::accountId:user/uName"
          },
          "Action": "dynamodb:*",
          "Resource": "arn:aws:dynamodb:ap-south-1:accountId:table/tableName"
        }
      ]
    }
		```

2.  Each record in the db must have the partition key. A record can be inserted via the [PutItemCommand](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/client/dynamodb/command/PutItemCommand/) command with a payload similar to:

   ```
	  const record: Record<string, AttributeValue> = {
      id: { S: 'as2323' },
      productId: { S: '12345' },
      name: { S: 'Wireless Headphones' },
      price: { N: '199.99' },
      category: { S: 'Electronics' },
      userData: {
        M: {
          theme: { S: 'dark' },
          marks: { L: [{ N: '30' }, { N: '4' }, { N: '5' }] },
          isActive: { BOOL: true }
        }
      }
    };
	  ```

		where `S` is string, `N` is number, `L` is list and so on.

4.  To automatically delete records, turn on the **Time to Live (TTL)** setting under the **Additional Settings** for the table. The TTL value must be a Unix timestamp (seconds, not milliseconds).