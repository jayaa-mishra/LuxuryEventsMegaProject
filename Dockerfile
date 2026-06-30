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

# Bake the API base URL into the bundle. Defaults to a same-origin relative path
# (/api/v1) which nginx proxies to the gateway. Override via build arg if needed.
ARG VITE_API_BASE_URL=/api/v1
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL

# Build the application for production
RUN npm run build

# Stage 2: Serve the application using NGINX
FROM nginx:alpine

# Custom config: SPA routing + reverse-proxy /api to the gateway
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy the build output to NGINX serve directory
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port 80 for web traffic
EXPOSE 80

# Run NGINX in the foreground
CMD ["nginx", "-g", "daemon off;"]
