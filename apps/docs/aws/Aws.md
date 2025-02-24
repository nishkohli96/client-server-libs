# AWS Notes

1.  The default AWS region is `us-east-1` **(N. Virginia)**. Each region has 3-6 availability zones.

2.  For complete list of AWS regions and services offered across each region, you can visit the [AWS Global Infrastructure](https://aws.amazon.com/about-aws/global-infrastructure/) page.

3. **IAM**: Create a new user by navigating to the `IAM` service under `Access Management > Users`. Define **Password Policy** by navigating to `IAM > Account Settings > Password Policy > Edit`. Generate access keys for the user by navigating to the "Security credentials" tab for them. Authenticate in aws shell using `aws configure` providing the **AWS Access Key ID** and **AWS Secret Access Key**.

4. For billing, signinto the AWS using the root user account or enable billing if you have administrator access. You can view cost breakdown for each service under the **Bills** section. You can also check the usage of free services under **Free Tier** section, to avoid being charged if the usage limit is nearing the specified free-tier cap. Create free, weekly or montly budgets under the **Budget** section, so that you know once your usage cost is about to reach the specified budget amount.

5. When creating an **EC2**, you can specify the start commands or upload file under `Advanced details > User data` section. When restarting an instance, its public IP would change, but the private IP will remain constant. To modify EC2 user data, select the instance, stop its execution, then `Actions > Instance settings > Edit user data`.