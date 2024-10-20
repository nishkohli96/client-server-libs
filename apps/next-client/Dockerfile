FROM node:20-alpine3.18 AS base

# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine 
# to understand why libc6-compat might be needed.
# RUN apk add --no-cache libc6-compat

WORKDIR /app

# Create directories to copy application code
RUN mkdir -p packages/shared-fe
RUN mkdir -p apps/next-client

COPY --chown=node:node turbo.json .
COPY --chown=node:node package.json .
COPY --chown=node:node yarn.lock .

# Copy required app and packages
COPY --chown=node:node ./packages/shared-fe packages/shared-fe
COPY ./apps/next-client ./apps/next-client

# Install node_modules
RUN yarn --frozen-lockfile

# Using Turbo pipeline build -
# @csl/shared-fe & next-client
RUN yarn build

# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry during the build.
# ENV NEXT_TELEMETRY_DISABLED 1

# Expose the port Next.js app runs on (default is 3000)
EXPOSE 3001

CMD [ "yarn", "workspace", "next-client", "start" ]