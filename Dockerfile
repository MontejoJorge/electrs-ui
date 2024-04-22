# Build Stage
FROM node:16-buster-slim AS electrs-builder

# Install tools
# RUN apt-get update \
#     && apt-get install -y build-essential \
#     && apt-get install -y python3

# Create app directory
WORKDIR /app

# Copy pnpm-lock.yaml' and 'package.json'
COPY pnpm-lock.yaml package.json pnpm-workspace.yaml ./
COPY apps ./apps

# Install dependencies
RUN npm install -g pnpm@7
RUN pnpm install

# Copy project files and folders to the current working directory (i.e. '/app')
COPY . .

RUN pnpm run build:frontend

# Final image
FROM node:16-buster-slim AS electrs

# Copy built code from build stage to '/app' directory
COPY --from=electrs-builder /app /app

# Change directory to '/app' 
WORKDIR /app

EXPOSE 3006
CMD [ "npm", "run", "dev:backend" ]
