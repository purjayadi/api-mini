FROM node:lts-alpine
WORKDIR /home/app
COPY . .
expose 3001