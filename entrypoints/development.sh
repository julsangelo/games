#!/bin/bash

if [ ! -d "./node_modules" ]; then
    echo "Installing npm packages..."
    npm install
fi

if [ ! -d "./vendor" ]; then
    echo "Installing composer packages..."
    composer install
fi

chown -R 1000:www-data 0:www-data /var/www/html ./vendor ./node_modules
/usr/bin/supervisord -c /etc/supervisor/conf.d/supervisor.conf

/entrypoint supervisord