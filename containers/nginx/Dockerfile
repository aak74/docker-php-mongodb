FROM nginx:1.14

LABEL maintainer="Andrew Kopylov <aa74ko@gmail.com>"

RUN apt-get update \
  && apt-get install --no-install-recommends --no-install-suggests -y \
  curl netcat

COPY ./rootfs /

HEALTHCHECK --interval=5s --timeout=3s \
  CMD curl -f http://localhost:8080/status/ || exit 1
