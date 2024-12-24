FROM node:alpine

WORKDIR /app
COPY package.json ./
RUN yarn install

COPY . .
RUN yarn build

ENTRYPOINT ["/bin/sh", "start.sh"]

EXPOSE 3000
