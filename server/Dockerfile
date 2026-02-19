FROM richarvey/nginx-php-fpm:3.1.6

# Install Composer first
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/bin --filename=composer

# Use temp dir to avoid volume override
WORKDIR /tmp/project
COPY . .
RUN composer install --no-scripts --no-autoloader

# Copy to web root
WORKDIR /var/www/html
RUN cp -R /tmp/project/. . && composer dump-autoload

# Laravel config
ENV APP_ENV production
ENV APP_DEBUG false
ENV LOG_CHANNEL stderr
ENV COMPOSER_ALLOW_SUPERUSER 1

CMD ["/start.sh"]   