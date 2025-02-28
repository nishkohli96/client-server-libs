# AWS CLI Commands

1. `aws --version`: Current version of the installed aws-cli.

2. `aws iam list-users`: List the details of the user logged into the console.

3. `ssh -i keyPath.pem <user>@<ec2Pubipv4>`: Connect to EC2 instance via SSH on system terminal. For **_Amazon Linux_**, the user would be `ec2-user` whereas for _**Ubuntu**_ it would be `ubuntu`.

    Use `chmod 0400 keyPath.pem` first to set the file permissions to read-only for the owner and remove all other permissions for this file before connecting to EC2. You generally create a new or use existing key-pair when creating an EC2 instance but can also create a new key-pair if lost access to the original key-pair.

5. `uptime`: The duration for which an EC2 instance has been running.

6. `cat /var/log/cloud-init-output.log`: User data logs for an EC2 instance. Use `cat /var/log/cloud-init.log` for detailed cloud-init process logs.