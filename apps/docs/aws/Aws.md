# AWS Notes

## General

1.  The default AWS region is `us-east-1` **(N. Virginia)**. Each region has 3-6 availability zones.

2.  For complete list of AWS regions and services offered across each region, you can visit the [AWS Global Infrastructure](https://aws.amazon.com/about-aws/global-infrastructure/) page.

3.  **IAM**: Create a new user by navigating to the `IAM` service under `Access Management > Users`. Define **Password Policy** by navigating to `IAM > Account Settings > Password Policy > Edit`. Generate access keys for the user by navigating to the "Security credentials" tab for them. Authenticate in aws shell using `aws configure` providing the **AWS Access Key ID** and **AWS Secret Access Key**.

4.  For billing, signinto the AWS using the root user account or enable billing if you have administrator access. You can view cost breakdown for each service under the **Bills** section. You can also check the usage of free services under **Free Tier** section, to avoid being charged if the usage limit is nearing the specified free-tier cap. Create free, weekly or montly budgets under the **Budget** section, so that you know once your usage cost is about to reach the specified budget amount.

5.  AWS SDK follows a credential resolution chain. This means if you don't explicitly pass credentials like:

    ```js
    const iamClient = new IAMClient({
      credentials: {
        accessKeyId: ENV_VARS.aws.accessKey,
        secretAccessKey: ENV_VARS.aws.accessKeySecret
      }
    });
    ```
    The SDK automatically looks for credentials in multiple places in the following order:

    - Environment Variables (`AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, etc.)
    - Shared Credentials File (usually in `~/.aws/credentials`)
    - Shared Config File (usually in `~/.aws/config`)
    - EC2 Instance Metadata (if running on EC2 or Lambda)
    - ECS Container Credentials (if running in ECS)

    **Avoid hardcoding credentials in code — even if you are pulling them from environment variables. Let AWS SDK handle credential discovery automatically.**

## EC2

1.  When creating an **EC2**, you can specify the start commands or upload file under `Advanced details > User data` section. When restarting an instance, its public IP would change, but the private IP will remain constant. To modify EC2 user data, select the instance, stop its execution, then `Actions > Instance settings > Edit user data`.

2.  For an EC2 instance,
    | Port Number | Function |
    |-|-|
    | **22** | SSH & SFTP (Secure FTP, ie upload files via ssh) |
    | **21** | FTP (File Transfer Protocol) |
    |  **80** | HTTP - Access unsecured websites |
    |  **443** | HTTPS - Secure web browsing |
    | **3389** | RDP (Remote Desktop Protocol) |

3.  Public IPv4 of an EC2 instance changes whenever you start and stop an instance. To prevent this from happening, create a new **Elastic IP** under `Network & Security > Elastic IPs` and assign that IP to your EC2 instance. Make sure to disassociate and release the Elastic IP address to avoid being charged.

4.  To create a new AMI from an EC2 instance, select and right click it, then `Image and templates > Create image`. This newly created image will be available under `Images > AMIs`. You can also explore or purchase AMIs in the `Images > AMI Catalog` section. You can launch new instances by clicking on the **Launch Instance from AMI** button or selecting your own AMI from the _Application and OS Images_ section when creating a new instance.

5.  Refer the user-data setup scripts for [Amazon Linux](./ec2_node_amazon-linux.sh) and [Ubuntu](./ec2_node_ubuntu.sh) which update the packages, install git,[nvm](https://github.com/nvm-sh/nvm), [node](https://nodejs.org/en) and [pm2](https://pm2.keymetrics.io/docs/usage/quick-start/). Root’s home directory is `/root`, while ec2-user's home is `/home/ec2-user`. You will get "Permission denied" error message if you try to navigate to root directory as an ec2-user.

    I will be running the installation scripts as the default **ec2-user**. `<< 'EOF'`	starts a heredoc block, which lets you pass multiple commands into the shell. `EOF` marks the end of the heredoc block. Everything between `<< 'EOF'` and `EOF` runs in the ec2-user shell. I can also use a different delimiter like `EOF_SCRIPT`.


## Load Balancer

1.  You can create a **Load Balancer** under _Load Balancing_ section of EC2. Create Application Load Balancer (ALB) to route your user to the selected EC2 instances in the target group. Copy and paste the DNS name of your load balancer, it will now automatically reroute traffic to the configured instances in the assigned target group.
    Also make sure to update the secuity groups of your EC2 instances to that of your load balancer, so that traffic comes only via LB.

2.  To make sure that your application is connected to only a specific EC2 instance of a ALB, you can use Sticky Sessions. Go to `EC2 > Load Balancing > Target Groups > <Select tgtGrp> > Actions > Edit Attributes`. Look for **Stickiness** under _Target selection configuration_. You can test the cookie duration via either `Load balancer generated cookie` or using your own `Application based cookie` with a custom name.


## EBS

1.  Elastic Block Store can be used to store data for your EC2 instance.

2.  EBS Snapshot can take a backup(snapshot) of your EBS volume at a point in time and can copy the snapshot to a AZ or a region. It is not necessary, but recommended to detach volume when taking a snapshot.

3. You can create a new volume from snapshot by navigating `EC2 > EBS > Snapshots > Create volume from snapshot`.

## S3

1. Each bucket name must be globally unique and it only belongs to the region it is created in.

2. By default the objects in a bucket will not have public access for securiy reasons. Only after enabling the public access, its contents would be publically accessible.

3. Versioning in files can be enabled at bucket level. Same key overwrite will change the version, and previous versions can also be rolled back. It can be enabled in `bucketName > Properties > Bucket Versioning`.
    Any file that is no versioned prior to enabling versioning will have the version **null**. Suspending versioning does not delete the previous versions.

4. S3 Replication - **CRR**(Cross Region Replication) & **SRR**(Same Region Replication) is asynchronous and must have proper IAM permissions. It can be done under `bucketName > Management > Replication rules`. Previously uploaded objects would be to be replicated via a batch operation, but any subsequent uploads in the source bucket after replication has been applied, will also be copied to the destination bucket.
    **S3 Replication requires versioning to be enabled on both the source and destination buckets.**

5. Whenever a file is uploaded in S3, you can create event notifications for a lambda, SNS or SQS trigger in `bucketName > Properties > Event notifications` or enable **Amazon Eventbridge** to build event driven applications at scale using S3 event notifications. Add `Send Message` action in the Policy Generator for your concerned SNS, SQS or lambda. 


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
