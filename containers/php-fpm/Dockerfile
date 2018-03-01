FROM php:7.1-fpm
MAINTAINER Andrew Kopylov <aa74ko@gmail.com>

RUN apt-get update && apt-get install -y \
        libmcrypt-dev \
        && apt-get install -y libpq-dev \
        && docker-php-ext-install -j$(nproc) mcrypt \
        && pecl install mongodb \
        && docker-php-ext-enable mongodb

RUN docker-php-ext-install mbstring
RUN docker-php-ext-install exif
RUN docker-php-ext-install opcache
RUN docker-php-ext-install bcmath

RUN echo 'date.timezone="Europe/Moscow"' >>  /usr/local/etc/php/conf.d/date.ini

WORKDIR /var/www/public/

# COPY . /html
# COPY conf/ /usr/local/etc/php-fpm.d/
CMD ["php-fpm"]
