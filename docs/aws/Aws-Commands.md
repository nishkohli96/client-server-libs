# AWS CLI Commands

## General
1. `aws --version`: Current version of the installed aws-cli.

2. `aws iam list-users`: List the details of the user logged into the console.

## EC2

1. `ssh -i keyPath.pem <user>@<ec2Pubipv4>`: Connect to EC2 instance via SSH on system terminal. For **_Amazon Linux_**, the user would be `ec2-user` whereas for _**Ubuntu**_ it would be `ubuntu`.

    Use `chmod 0400 keyPath.pem` first to set the file permissions to read-only for the owner and remove all other permissions for this file before connecting to EC2. You generally create a new or use existing key-pair when creating an EC2 instance but can also create a new key-pair if lost access to the original key-pair.

2. `uptime`: The duration for which an EC2 instance has been running.

3. `cat /var/log/cloud-init-output.log`: User data logs for an EC2 instance. Use `cat /var/log/cloud-init.log` for detailed cloud-init process logs.

4. `sudo yum install -y bind-utils`: Installs `dig` and `nslookup`(short for "Name Server Lookup") which are command-line tools used to query Domain Name System (DNS) servers to obtain information about domain names, IP addresses, or DNS records. Eg: `nslookup/dig google.com`.

## SES

1. `aws sesv2 list-email-templates`: View a list of all of your existing email templates.

2. `aws sesv2 get-email-template --template-name MyTemplate`: View the contents of an email template.

3. `aws sesv2 create-email-template --cli-input-json file://path/to/update_template.json`: Upload a specific email template in SES, example [simple-email-template.json](../../express-server/src/aws/simple-email-template.json).

    Similarly to update this template, run:
    ```
    aws sesv2 create-email-template --cli-input-json file://simple-email-template.json
    ```

4. `aws sesv2 delete-email-template --template-name MyTemplate`: To delete an email template.

Reference: AWS docs for [managing email templates](https://docs.aws.amazon.com/ses/latest/dg/send-personalized-email-manage-templates.html).


## SSM

1.  `aws ssm get-parameters --name /my-app/dev/db/username /my-app/dev/db/password`:  Get values of the specified **SSM parameters** Use `--with-decryption` to get the decrypted value for an encrypted param.

2.  `aws ssm get-parameters-by-path --path /my-app/dev`: Get all SSM parameters starting with the input prefix.

3.  `aws ssm get-parameters-by-path -path /my-app/ --recursive`: Get all params under the path tree.
