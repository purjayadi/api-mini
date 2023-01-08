FROM node:lts-alpine
WORKDIR /home/app
COPY . .
RUN yarn install
EXPOSE 9000