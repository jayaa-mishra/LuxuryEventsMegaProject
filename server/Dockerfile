# Stage 1: Build the TypeScript backend
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json package-lock.json* ./

# Install all dependencies (including devDependencies for tsc)
RUN npm ci

# Copy source code
COPY . .

# Compile TypeScript to JavaScript
RUN npm run build

# Stage 2: Production Runtime
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Set environment to production
ENV NODE_ENV=production

# Copy only package files for production install
COPY package.json package-lock.json* ./

# Install only production dependencies
RUN npm ci --omit=dev

# Copy compiled JavaScript from the builder stage
COPY --from=builder /app/dist ./dist

# Expose port 5000
EXPOSE 5000

# Start the Node.js server
CMD ["node", "dist/server.js"]
