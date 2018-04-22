FROM php:7.1-fpm

LABEL maintainer="Andrew Kopylov <aa74ko@gmail.com>"

RUN apt-get update && apt-get install -y \
  libmcrypt-dev \
  && apt-get install -y libpq-dev \
  && docker-php-ext-install -j$(nproc) mcrypt \
  && docker-php-ext-install mbstring \
  && docker-php-ext-install exif \
  && docker-php-ext-install opcache \
  && docker-php-ext-install bcmath \
  && echo 'date.timezone="Europe/Moscow"' >>  /usr/local/etc/php/conf.d/date.ini

RUN pecl install mongodb \
  && docker-php-ext-enable mongodb

# COPY ./docker
# RUN php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');" \
#   && php -r "if (hash_file('SHA384', 'composer-setup.php') === '544e09ee996cdf60ece3804abc52599c22b1f40f4323403c44d44fdfdd586475ca9813a858088ffbc1f233e9b180f061') { echo 'Installer verified'; } else { echo 'Installer corrupt'; unlink('composer-setup.php'); } echo PHP_EOL;" \
#   && php composer-setup.php \
#   && php -r "unlink('composer-setup.php');"

# RUN apt-get install -y mc


WORKDIR /var/www/public/

# COPY . /html
# COPY conf/ /usr/local/etc/php-fpm.d/
EXPOSE 9000

# RUN useradd -m cont
USER 1000

CMD ["php-fpm"]
