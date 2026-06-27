# Stage 1: Build the React Application
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json package-lock.json* ./

# Install dependencies cleanly
RUN npm ci

# Copy the rest of the frontend source code
COPY . .

# Build the application for production
RUN npm run build

# Stage 2: Serve the application using NGINX
FROM nginx:alpine

# Copy the build output to NGINX serve directory
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port 80 for web traffic
EXPOSE 80

# Run NGINX in the foreground
CMD ["nginx", "-g", "daemon off;"]
