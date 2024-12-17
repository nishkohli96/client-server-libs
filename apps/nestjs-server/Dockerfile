# Base Image
FROM node:20-alpine3.18 AS phase1

WORKDIR /app

# Create directories to copy application code
RUN mkdir -p apps/nestjs-server

# Copy essential files in project root
COPY --chown=node:node package.json turbo.json yarn.lock ./

# Copy application source code
COPY --chown=node:node ./apps/nestjs-server apps/nestjs-server

# install node_modules
RUN yarn install --frozen-lockfile

# run server in prod env
CMD ["yarn", "workspace", "nestjs-server", "start"]
