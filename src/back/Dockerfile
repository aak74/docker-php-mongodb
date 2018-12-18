FROM node:8-alpine

RUN mkdir /var/log/node
WORKDIR /app
RUN npm install -g nodemon

RUN apk add --no-cache curl

# COPY src/package*.json /app/
# RUN npm install

EXPOSE 3000
EXPOSE 5858

HEALTHCHECK --interval=5s --timeout=3s \
  CMD curl -f http://localhost:3000/status || exit 1

CMD "/app/run.sh"
