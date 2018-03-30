FROM php:7-cli

LABEL maintainer="Andrew Kopylov <aa74ko@gmail.com>"

RUN apt-get update \
    && apt-get install -y \
    # tini \
    wget \
    unzip \
    rsync \
    sshpass

WORKDIR /app/

COPY ./rootfs/ /

CMD ["php", "/app/runner/run.php"]