# AWS Notes

## General

1.  The default AWS region is `us-east-1` **(N. Virginia)**. Each region has 3-6 availability zones.

2.  For complete list of AWS regions and services offered across each region, you can visit the [AWS Global Infrastructure](https://aws.amazon.com/about-aws/global-infrastructure/) page.

3.  **IAM**: Create a new user by navigating to the `IAM` service under `Access Management > Users`. Define **Password Policy** by navigating to `IAM > Account Settings > Password Policy > Edit`. Generate access keys for the user by navigating to the "Security credentials" tab for them. Authenticate in aws shell using `aws configure` providing the **AWS Access Key ID** and **AWS Secret Access Key**.

4.  For billing, signinto the AWS using the root user account or enable billing if you have administrator access. You can view cost breakdown for each service under the **Bills** section. You can also check the usage of free services under **Free Tier** section, to avoid being charged if the usage limit is nearing the specified free-tier cap. Create free, weekly or montly budgets under the **Budget** section, so that you know once your usage cost is about to reach the specified budget amount.

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

4. To create a new AMI from an EC2 instance, select and right click it, then `Image and templates > Create image`. This newly created image will be available under `Images > AMIs`. You can also explore or purchase AMIs in the `Images > AMI Catalog` section.

# EBS

1.  Elastic Block Store can be used to store data for your EC2 instance.

2.  EBS Snapshot can take a backup(snapshot) of your EBS volume at a point in time and can copy the snapshot to a AZ or a region. It is not necessary, but recommended to detach volume when taking a snapshot.

3. You can create a new volume from snapshot by navigating `EC2 > EBS > Snapshots > Create volume from snapshot`.
