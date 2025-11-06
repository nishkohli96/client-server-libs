#!/bin/bash

# 🚀 Project Setup Script
# This script installs dependencies, builds shared packages,
# and links internal modules.

echo "🏁 Starting project setup..."

# 🧩 Step 1: Check for Yarn
if ! command -v yarn &> /dev/null; then
  echo "📦 Yarn not found. Installing Yarn v1.22.22..."
  npm install -g yarn@1.22.22
else
  echo "✅ Yarn is already installed globally."
fi

# ⚙️ Step 2: Install dependencies and build shared libraries
echo "📥 Installing dependencies & building shared packages..."
yarn install --frozen-lockfile --non-interactive
yarn lib

# 🔗 Step 3: Link internal shared packages
echo "🔗 Linking internal packages..."

# Link express-react-shared
cd packages/express-react-shared/dist || exit
yarn link
cd ../../

# Link mongo-models
echo "🔗 Linking mongo-models..."
cd mongo-models/dist || exit
yarn link
cd ../../

# Link shared-fe
echo "🔗 Linking shared-fe..."
cd shared-fe/dist || exit
yarn link
cd ../../../


# 🧠 Step 4: Link all packages to the express-server app
echo "🔗 Linking packages to apps..."

echo "🧩 Linking packages with express-server"
cd apps/express-server || exit
yarn link @csl/mongo-models @csl/react-express

echo "🧩 Linking packages with mongo-seeders"
cd ../mongo-seeders
yarn link @csl/mongo-models

echo "🧩 Linking packages with next-client"
cd ../next-client
yarn link @csl/mongo-models @csl/shared-fe

echo "🧩 Linking packages with next-client"
cd ../next-client
yarn link @csl/mongo-models @csl/shared-fe

echo "🧩 Linking packages with react-client"
cd ../react-client
yarn link @csl/mongo-models @csl/react-express @csl/shared-fe

# 🎉 Step 5: Final confirmation
echo ""
echo "✅ Setup Complete! Your project is ready to roll! 🚀"
echo "----------------------------------------------"
echo "🧱 Linked Packages:"
echo "   - @csl/mongo-models"
echo "   - @csl/react-express"
echo "   - @csl/shared-fe"
echo "----------------------------------------------"
