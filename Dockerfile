FROM nginx:stable-alpine
COPY build /usr/share/nginx/html/dashboard
COPY nginx.conf /etc/nginx
#COPY default.conf /etc/nginx/conf.d