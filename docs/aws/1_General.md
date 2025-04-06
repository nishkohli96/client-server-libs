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

## Systems Manager

1.  Both AWS **Secrets Manager** and **Systems Manager** (SSM) Parameter Store are used for managing secrets, but Secrets Manager has automatic secret rotation and is more expensive than the latter.
