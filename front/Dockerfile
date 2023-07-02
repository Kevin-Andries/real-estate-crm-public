# Node 14.16.0 on Alpine 3.13
FROM node:14.16.0-alpine3.13
RUN addgroup app && adduser -S -G app app
USER app
WORKDIR /app
COPY package*.json .
RUN npm i
COPY . .
EXPOSE 3000
ENTRYPOINT ["npm", "start"]

