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

6.  The default **Handler**, ie. the point of execution of a lambda function is `index.handler` which means that the code execution will start from the `handler` function of `index.(js|mjs)` file. This can be changed under the `Code > Runtime settings`.
    If the entry point of your code is in `src/index.js` file, then the handler's value would be `src/index.handler`. 

7.  Using the same S3 bucket for both input and output is not recommended and that this configuration can cause recursive invocations, increased Lambda usage, and increased costs.

8.  You can directly configure environment variables in the visual code editor of your lambda function. The following reserved variables cannot be defined in environment variables:
    - `AWS_ACCESS_KEY_ID`
    - `AWS_SECRET_ACCESS_KEY`
    - `AWS_REGION`  

9.  The source code of a lambda function can be updated either by directly uploading a `.zip` folder or by pasting S3 link URL to your function code .zip file.
    Check out my [lambda-s3](https://github.com/nishkohli96/lambda-s3) repository, where I’ve implemented GitHub Actions to automatically update the Lambda function whenever changes are pushed to the `main` branch. 🚀


### Deploy Lambda function

1. Using AWS CLI

    🔹 Step 1: Zip Your Code
    ```sh
    zip -r function.zip .
    ```

    🔹 Step 2: Upload to Lambda
    ```
    aws lambda update-function-code --function-name MyLambdaFunction --zip-file fileb://function.zip
    ```
    
    ✅ Works for simple functions

    ❌ Limited to 50MB direct uploads (use S3 for larger functions)

 2. Using AWS CLI with S3 (For Large Deployments)
    If your **code exceeds 50MB**, upload the .zip to S3 and deploy from there.
    
    🔹 Step 1: Zip Your Code
    ```sh
    zip -r function.zip .
    ```

    🔹 Step 2: Upload to S3
    ```
    aws s3 cp function.zip s3://my-bucket/function.zip
    ```

    🔹 Step 3: Deploy from S3
    ```
    aws lambda update-function-code --function-name MyLambdaFunction --s3-bucket my-bucket --s3-key function.zip
    ```

    ✅ Works for large codebases

    ✅ S3 can store previous versions for rollback



## DynamoDB

1.  A DynamoDB table is **region-based** by default. Use the following policy when creating a dynamoDB table or refer the [DynamoDB resource based policy examples](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/rbac-examples.html).
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

4.  To automatically delete records, turn on the **Time to Live (TTL)** setting under the **Additional Settings** for the table. The TTL value must be a Unix timestamp (seconds, not milliseconds). Expired items are not queryable.

    You must manually add the TTL attribute (eg: `expiresAt`) to each item.DynamoDB does not set a default expiration time—you must include the TTL field with a Unix timestamp for each record when inserting it. If no TTL is provided, the item will never expire.
