FROM node:alpine

WORKDIR /app
COPY package.json ./
RUN yarn install && rm -rf /usr/local/share/.cache

COPY . .
RUN yarn build

ENTRYPOINT ["/bin/sh", "start.sh"]

EXPOSE 3000
