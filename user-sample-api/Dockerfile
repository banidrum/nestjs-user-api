FROM node:14-alpine

WORKDIR /src

ADD . /src

RUN npm install

RUN npm run build

COPY . .

EXPOSE 3000

CMD ["node", "dist/main"]