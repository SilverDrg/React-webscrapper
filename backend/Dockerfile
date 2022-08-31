FROM node:18-alpine
RUN mkdir app
WORKDIR /home/node/app
COPY package.json .
COPY package-lock.json .
RUN npm ci
COPY . .
RUN npx tsc
EXPOSE 8081
CMD [ "npm", "start" ]