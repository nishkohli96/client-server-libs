#!/bin/bash
# EC2 User Data script for Amazon Linux 2 (yum)

# Update all packages
sudo yum update -y

# Install git
sudo yum install -y git
git --version

# Setup node env in "ec2-user" directory
sudo -u ec2-user bash << 'EOF'
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
export NVM_DIR="/home/ec2-user/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && source "$NVM_DIR/nvm.sh"
nvm install node
node -v
npm -v
npm i -g pm2
EOF

