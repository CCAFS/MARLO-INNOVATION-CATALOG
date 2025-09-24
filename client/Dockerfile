#################### BUILD STAGE ####################
FROM node:20-alpine AS build

WORKDIR /usr/src/app

# Copy dependency manifests first for better layer caching
COPY client/package*.json ./

# Install dependencies with lockfile to ensure reproducible builds
RUN npm ci

# Copy the rest of the frontend sources
COPY client/ ./

# Build the Astro application
RUN npm run build

#################### TEST STAGE ####################
FROM node:20-alpine AS test

WORKDIR /usr/src/app

# Reuse the build artifacts and node_modules from the build stage
COPY --from=build /usr/src/app /usr/src/app

# Optional static analysis step; adjust or remove if not needed
RUN npm run astro -- check

#################### PRODUCTION STAGE ####################
FROM nginx:alpine AS production

# Remove the default Nginx content
RUN rm -rf /usr/share/nginx/html/*

# Copy the compiled Astro site into Nginx's served directory
COPY --from=build /usr/src/app/dist /usr/share/nginx/html

# Uncomment the next line and provide your own config if you need custom Nginx settings
# COPY nginx.conf /etc/nginx/nginx.conf

# Ensure the correct permissions for static assets
RUN chmod -R 755 /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
