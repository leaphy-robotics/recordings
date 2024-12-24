FROM node:alpine

WORKDIR /app
COPY package.json ./
RUN yarn install

COPY . .
RUN yarn build

CMD ["bash", "start.sh"]

EXPOSE 3000
