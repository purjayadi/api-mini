FROM node:lts-alpine
WORKDIR /home/app
COPY . .
expose 5000