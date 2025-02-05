# Base Image
FROM node:20-alpine3.18 AS builder

WORKDIR /app

# Create directories to copy application code
RUN mkdir -p packages/express-react-shared
RUN mkdir -p packages/mongo-models
RUN mkdir -p apps/express-server

# Copy essential files in project root
COPY --chown=node:node package.json tsconfig.json turbo.json yarn.lock ./

# Copy required app and packages
COPY --chown=node:node ./packages/express-react-shared packages/express-react-shared
COPY --chown=node:node ./packages/mongo-models packages/mongo-models
COPY --chown=node:node ./apps/express-server apps/express-server

# Install node_modules
RUN yarn install --frozen-lockfile --non-interactive

# Using Turbo pipeline build -
# @csl/react-express & express-server
RUN yarn build

# ----- Prepare production image -----
# FROM node:20-alpine3.18 AS production

# WORKDIR /app

# Copy built files from the previous stage
# COPY --from=builder /app/apps/express-server/dist ./dist
# COPY --from=builder /app/apps/express-server/package.json .
# COPY --from=builder /app/node_modules ./node_modules
# COPY --from=builder /app/yarn.lock .

# COPY --from=builder /app/apps/express-server/dist .
# COPY --from=builder /app/apps/express-server/package.json .
# COPY --from=builder /app/yarn.lock .

# Install only production dependencies
# RUN yarn install --force --production --frozen-lockfile

# Copy the built node_modules
# COPY --from=builder /app/node_modules/@csl/mongo-models ./node_modules
# COPY --from=builder /app/node_modules/@csl/react-express ./node_modules

# Run express-server build
CMD ["yarn", "workspace", "express-server", "start"]
