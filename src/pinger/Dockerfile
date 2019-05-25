FROM node:10-alpine

RUN mkdir /var/log/node
WORKDIR /app
RUN npm install -g nodemon

RUN apk add --no-cache curl

CMD "/app/run.sh"
