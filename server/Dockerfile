FROM node:18-alpine

COPY . /usr/src/server

# Create server directory
WORKDIR /usr/src/server

RUN yarn install

EXPOSE 8080

ENV NODE_ENV production

CMD ["npm", "run", "start"]