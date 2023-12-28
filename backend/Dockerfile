FROM node:16-alpine as build
WORKDIR /app
COPY . .
RUN npm i && npm run build

FROM node:16-alpine as runtime
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm i --omit=dev

FROM node:16-alpine
WORKDIR /app
COPY --from=build /app/dist ./
COPY --from=runtime /app ./
EXPOSE 3000
CMD ["node", "./main.js"]