FROM node:16

WORKDIR /app

ADD . .

RUN npm ci

RUN npm run build-frontend

EXPOSE 3000

CMD [ "npm", "run", "serve-frontend" ]

