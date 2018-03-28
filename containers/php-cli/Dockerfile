FROM php:7-cli

LABEL maintainer="Andrew Kopylov <aa74ko@gmail.com>"

RUN apt-get update \
    && apt-get install -y \
    # tini \
    wget \
    unzip \
    libssh2-1-dev \
    && cd /opt \
    && wget https://github.com/Sean-Der/pecl-networking-ssh2/archive/php7.zip \
    && unzip php7.zip \
    # && ls -la \
    && cd pecl-networking-ssh2-php7\
    && phpize \
    && ./configure \
    && make \
    && make install

WORKDIR /app/

# RUN mkdir /var/log/php
COPY ./rootfs/ /

# "php", "-v", "/var/log/php/some.log"]
CMD ["php", "/app/runner/run.php"]
# CMD ["/app/backup-runner/"]
# ENTRYPOINT ["tini", "--"]
