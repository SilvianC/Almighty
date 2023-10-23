FROM node:18 AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html

RUN rm /etc/nginx/conf.d/default.conf

COPY nginx/nginx.conf /etc/nginx/conf.d

COPY /var/log/letsencrypt/ /etc/letsencrypt/

EXPOSE 80 443

CMD ["nginx", "-g", "daemon off;"]

