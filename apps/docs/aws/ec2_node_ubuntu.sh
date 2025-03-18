#!/bin/bash
# EC2 User Data script for Ubuntu

# Update all packages
sudo apt update -y

# Install git
sudo apt install git -y
git --version

# Setup node env in "ubuntu" directory
sudo -u ubuntu bash << 'EC2_SCRIPT'
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
export NVM_DIR="/home/ubuntu/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && source "$NVM_DIR/nvm.sh"
nvm install node
node -v
npm -v
npm i -g pm2
EC2_SCRIPT
