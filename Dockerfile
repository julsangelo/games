FROM webdevops/php-nginx:8.2-alpine AS base

WORKDIR /var/www/html

ENV WEB_DOCUMENT_ROOT=/var/www/html/public
ENV WEB_DOCUMENT_INDEX=index.php

ENV TZ=Asia/Singapore

# Copy the supervisor configuration
COPY ./supervisor/supervisor.conf /etc/supervisor/conf.d/supervisor.conf

#Development Stage
FROM base AS development

RUN apk update && \
    apk add --no-cache \
    composer \
    nodejs \
    npm \
    supervisor

COPY ./entrypoints/development.sh /opt/docker/entrypoint/development.sh
RUN chmod +x /opt/docker/entrypoint/development.sh

EXPOSE 8080

ENTRYPOINT [ "/opt/docker/entrypoint/development.sh" ]

#Production Stage
FROM base AS production

COPY . .

RUN apk update && \
    apk add --no-cache \
    composer \
    nodejs \
    npm \
    supervisor

COPY ./entrypoints/development.sh /opt/docker/entrypoint/development.sh
RUN chmod +x /opt/docker/entrypoint/development.sh

EXPOSE 8080

ENTRYPOINT [ "/opt/docker/entrypoint/development.sh" ]
