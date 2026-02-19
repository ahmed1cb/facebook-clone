FROM richarvey/nginx-php-fpm:3.1.6

# Use temp directory to avoid volume override
WORKDIR /tmp/project
COPY . .

# Install Composer dependencies (outside volume path)
RUN composer install --no-scripts --no-autoloader

# Move code to web root
WORKDIR /var/www/html
RUN cp -R /tmp/project/. .

# Generate autoloader and cleanup
RUN composer dump-autoload && \
    php artisan key:generate

# Laravel config
ENV APP_ENV production
ENV APP_DEBUG false
ENV LOG_CHANNEL stderr

# Allow Composer as root
ENV COMPOSER_ALLOW_SUPERUSER 1

CMD ["/start.sh"]   