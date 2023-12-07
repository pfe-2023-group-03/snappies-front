FROM node:20-alpine as build

WORKDIR /app

COPY package.json ./

RUN npm install

COPY . .

RUN npm run deploy

FROM nginx:alpine

COPY --from=build /app/dist/snappies-front /usr/share/nginx/html

COPY ./nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80