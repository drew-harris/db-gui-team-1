FROM node:16-alpine

WORKDIR /app

ADD . .

RUN npm ci

RUN npm run build-backend

EXPOSE 8000

CMD [ "npm", "run", "serve-backend" ]


