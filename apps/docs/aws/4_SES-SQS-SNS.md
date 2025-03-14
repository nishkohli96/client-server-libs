## SES

1. A **Configuration Set** in Amazon SES is a way to group and manage email sending settings. It allows you to apply specific rules (like tracking events, publishing logs, etc.) to emails you send using SES.

2. AWS SES email templates are **region-specific**. So, if you want to send emails from `us-west-2` (Oregon), you would need to recreate the template in that region. If you modify and re-publish (recreate) an SES email template with the same name, it will override the existing template.

3. In Sandbox Mode, SES requires every recipient email address to be pre-verified before you can send to them. In Production Mode (After Moving Out of Sandbox), once your AWS SES account is out of the sandbox, you can send to any valid email address (no need to verify every recipient).

		To enable production mode, you **need to verify your domain** and **Request production access** in the SES Dashboard.

4. Key Rule in Sandbox Mode:
		- All recipient email addresses must be individually verified, regardless of the domain.
		- Verifying the domain only lets you send from any email address in that domain — it does not automatically authorize sending to all emails in the domain.

		✅ Once You Move to Production Mode:
		- You can send to any email address (no need to verify recipients anymore).
		- You still need to verify the sending domain or sender email.

5. Email sending commands:
		- [SendEmail](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/client/ses/command/SendEmailCommand/) - Basic email sending API where you define the subject, body, and recipient(s) directly in the request for simple transactional emails (e.g., password resets, notifications). Does not support attachments and personalization for different recipients.
		- [SendRawEmail](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/client/ses/command/SendRawEmailCommand/) - Lets you build the full email yourself (including headers, attachments, inline images). Refer [SendRawEmail.md](./SendRawEmail.md).
		- [SendTemplatedEmail](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/client/ses/command/SendTemplatedEmailCommand/) - Email content (subject, text, HTML) is defined in a template in SES, which supports personalization with dynamic variables.


## SQS

1.  SQS has unlimited throughput, unlimited number of messages in a queue and has low latency ( <10ms on publish and receive). Limitation of **256kb** per message sent.

2.  Default retention of messages is **4 days**, maximum is 14 days. 
The message is persisted in SQS until a consumer deletes it after successfully processing it. By default, a maximum of 10 messages can be retrieved per request.

3.  SQS is of two types:
    - `standard` : At-least-once delivery, message ordering isn't preserved, best-effort ordering
		- `FIFO`: First-in-first-out delivery, message ordering is preserved, exactly-once processing

4. The default visibility timeout is `30 seconds`, meaning it a consumer has polled a specific message, that message would only be visible to other consumer after this timeout ends, or if the consumer has not deleted the message. This timeout duration must be adjusted as per business logic on how long does it take to process the contents of the message.

5.  The name of a queue must end with **.fifo** if it is of type `FIFO`.

6.  A **Dead Letter Queue (DLQ)** is a special queue where messages that fail to be processed multiple times due to invalid data, processing failure or any other reason are sent for further investigation to prevent blocking the main queue.

    In Amazon SQS, you can configure a DLQ by setting a redrive policy that defines:
    - **MaxReceiveCount**: Number of times a message can be retried before being sent to the DLQ.
    - **DLQ Name**: The queue where failed messages are sent.

		You cna then analyze logs to identify recurring issues, reprocess messages after fixing the underlying issue or delete messages if they are not recoverable.

7.  To send messages to a DLQ, create two queues, a main queue and another queue to be used as a DLQ. Rnable the **Dead-letter queue** setting on the main queue and link the arn of the DLQ to send the failed messages.

8.  When using an SQS FIFO queue, each message within a `MessageGroupId`must have a unique `MessageDeduplicationId`. If the MessageGroupId is set, but MessageDeduplicationId is missing, you either need to provide this id or else enable `ContentBasedDeduplication` setting under the **Configuration** section of your queue.

9.   FIFO queues should receive one message at a time, so that they are processed in order and deleting messages individually ensures that FIFO constraints are met. If multiple messages are received and processed in parallel, a failure in one message could cause later messages to be processed before earlier ones, which violates FIFO behavior.


## SNS

1.  An SNS topic can receive notifications from a lot of sources like Cloudwatch Alarms, ASG, S3 Bucket, Lambda etc.

2.  Subscribers to an SNS topic can include a SQS, Lambda, Kinesis Data Firehose, Emails, SMS & Mobile Notifications and even http endpoints.

3.  You can push an event details in SNS, which is received in all SQS queues that are subscribers, and then each of these queues can be linked to specific services that require the event data. Thus this approach allows to add more SQS subscribers over time, be fully decoupled from each other and prevent any data loss and can also allow to send data for queues in different regions.

    Make sure your SQS queue access policy allows SNS to write.

4.  Just like SQS, the SNS can also be of type **Standard** or **FIFO**. The name of a FIFO SNS must end with `.fifo` and it can **only subscribe to a SQS**.

