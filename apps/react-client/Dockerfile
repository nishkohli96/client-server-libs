# Base Image
FROM node:20-alpine3.18 AS phase1

WORKDIR /app

# Create directories to copy application code
RUN mkdir -p packages/express-react-shared
RUN mkdir -p packages/shared-fe
RUN mkdir -p apps/react-client

# Copy essential files in project root
COPY --chown=node:node package.json tsconfig.json turbo.json yarn.lock ./

# Copy required app and packages
COPY --chown=node:node ./packages/express-react-shared packages/express-react-shared
COPY --chown=node:node ./packages/shared-fe packages/shared-fe
COPY --chown=node:node ./apps/react-client apps/react-client

# install node_modules
RUN yarn install --frozen-lockfile

# Using Turbo pipeline build -
# @csl/react-express, @csl/shared-fe & react-client
RUN yarn build

# Phase 2 - Get the Build and host on nginx
FROM nginx:1.25.4-alpine
COPY --from=phase1 /app/apps/react-client/build /usr/share/nginx/html
