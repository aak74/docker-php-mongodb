FROM php:7-cli

LABEL maintainer="Andrew Kopylov <aa74ko@gmail.com>"

RUN apt-get update \
    && apt-get install -y \
    wget \
    unzip \
    rsync \
    sshpass

WORKDIR /app/

COPY ./rootfs/ /

USER 1000:1000

CMD ["php", "/app/runner/run.php"]
