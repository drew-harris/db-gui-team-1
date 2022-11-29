FROM node:16-alpine

WORKDIR /app

ADD . .

RUN npm i

RUN npm run build-frontend

EXPOSE 3000

CMD [ "npm", "run", "serve-frontend" ]

