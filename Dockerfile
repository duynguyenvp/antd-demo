# Stage 1 - the build process
FROM node:current-alpine as build-deps
WORKDIR /usr/src/app
COPY package.json server.js ./
RUN yarn install
COPY ./src ./
COPY ./public ./
RUN yarn build
RUN rm -r /usr/src/app/src && rm -r /usr/src/app/public && rm -r /usr/src/app/node_modules && yarn install --production
EXPOSE 80
CMD ["node", "server.js"]