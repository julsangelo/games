# Base image for PHP and Nginx
FROM webdevops/php-nginx:8.2-alpine AS base

# Set working directory and environment variables
WORKDIR /var/www/html
ENV WEB_DOCUMENT_ROOT=/var/www/html/public
ENV WEB_DOCUMENT_INDEX=index.php
ENV TZ=Asia/Singapore

# Install dependencies
RUN apk update && \
    apk add --no-cache \
    composer \
    nodejs \
    npm

# Copy the application code into the container
COPY . .

# Install PHP dependencies
RUN composer install --no-dev --optimize-autoloader

# Build assets for production
RUN npm install && npm run production

# Expose the necessary port for Nginx
EXPOSE 8080

# Set entrypoint
CMD ["supervisord", "-c", "/opt/docker/etc/supervisor.conf"]
