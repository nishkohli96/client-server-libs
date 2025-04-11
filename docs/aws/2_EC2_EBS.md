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

## EBS

1.  Elastic Block Store can be used to store data for your EC2 instance.

2.  EBS Snapshot can take a backup(snapshot) of your EBS volume at a point in time and can copy the snapshot to a AZ or a region. It is not necessary, but recommended to detach volume when taking a snapshot.

3. You can create a new volume from snapshot by navigating `EC2 > EBS > Snapshots > Create volume from snapshot`.

## Load Balancer

1.  You can create a **Load Balancer** under _Load Balancing_ section of EC2. Create Application Load Balancer (ALB) to route your user to the selected EC2 instances in the target group. Copy and paste the DNS name of your load balancer, it will now automatically reroute traffic to the configured instances in the assigned target group.
    Also make sure to update the secuity groups of your EC2 instances to that of your load balancer, so that traffic comes only via LB.

2.  To make sure that your application is connected to only a specific EC2 instance of a ALB, you can use Sticky Sessions. Go to `EC2 > Load Balancing > Target Groups > <Select tgtGrp> > Actions > Edit Attributes`. Look for **Stickiness** under _Target selection configuration_. You can test the cookie duration via either `Load balancer generated cookie` or using your own `Application based cookie` with a custom name.
