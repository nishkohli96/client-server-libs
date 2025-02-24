#!/bin/bash
# Update system packages

# EC2 with Amazon Linux, you need yum
sudo yum update -y
# If using Ubuntu/Debian, replace yum with apt-get.
# Use `apt-get update -y` for Ubuntu

# Install Node.js (Latest LTS Version)
curl -fsSL https://rpm.nodesource.com/setup_20.x | sudo bash -  # Amazon Linux
sudo yum install -y nodejs  # Amazon Linux

# Alternative for Ubuntu (if using apt)
# curl -fsSL https://deb.nodesource.com/setup_20.x | sudo bash -
# sudo apt-get install -y nodejs

# Verify installation
node -v
npm -v

# httpd (short for HTTP Daemon) is the Apache HTTP Server process that
# handles web requests. It listens for incoming HTTP requests and serves
# web content (HTML, CSS, JavaScript, etc.) to users.

sudo yum install -y httpd
httpd -v
sudo systemctl start httpd
sudo systemctl enable httpd

echo "<h1>Hello World from ${hostname -f}</h1>" > /var/www/html/index.html