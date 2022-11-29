FROM node:16

WORKDIR /app

ADD . .

RUN npm i

RUN npm run build-backend

EXPOSE 8000

CMD [ "npm", "run", "serve-backend" ]

