FROM node:18-alpine AS build
RUN mkdir app
WORKDIR /home/node/app
COPY package.json .
COPY package-lock.json .
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:1.23-alpine AS webserver
COPY --from=build /home/node/app/build ./var/www/html
COPY ./nginx.conf /etc/nginx/nginx.conf
EXPOSE 8080