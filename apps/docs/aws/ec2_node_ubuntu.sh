#!/bin/bash
# EC2 User Data script for Ubuntu

# Update all packages
sudo apt update -y

# Install git
sudo apt install git -y
git --version

# Install nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash

# Load nvm immediately so it's available
export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm

# Verify nvm is installed
nvm -v

# Install Node.js
nvm install node

# Verify Node.js and npm
node -v
npm -v

# Install PM2 globally
npm i -g pm2
