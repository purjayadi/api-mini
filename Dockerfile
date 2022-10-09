FROM node:lts-alpine
WORKDIR /home/app
COPY . .
RUN yarn install
expose 3005