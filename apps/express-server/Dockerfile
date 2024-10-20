# Base Image
FROM node:20-alpine3.18 AS phase1

WORKDIR /app

# Create directories to copy application code
RUN mkdir -p packages/express-react-shared
RUN mkdir -p apps/express-server

# Copy essential files in project root
COPY --chown=node:node turbo.json .
COPY --chown=node:node tsconfig.json .
COPY --chown=node:node package.json .

# Copy required app and packages
COPY --chown=node:node ./packages/express-react-shared packages/express-react-shared
COPY --chown=node:node ./apps/express-server apps/express-server

# Install node_modules
RUN yarn install --frozen-lockfile

# Using Turbo pipeline build -
# @csl/react-express & express-server
RUN yarn build

# Run express-server build
CMD ["yarn", "workspace", "express-server", "start"]
