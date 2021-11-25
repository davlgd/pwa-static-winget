FROM nginx:alpine
RUN apk update && apk upgrade

COPY src/ /usr/share/nginx/html/
COPY scaleway.conf /etc/nginx/conf.d/default.conf

EXPOSE 8080