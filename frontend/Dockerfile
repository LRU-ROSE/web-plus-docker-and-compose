FROM node:16-alpine as builder
ARG BACKEND_URL
ENV REACT_APP_BACKEND_URL $BACKEND_URL
WORKDIR /app
COPY . .
RUN npm i && npm run build

FROM nginx:latest
COPY --from=builder /app/build ./usr/share/nginx/html
COPY /nginx/conf.d/default.conf ./etc/nginx/conf.d/default.conf
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]