FROM node:16

WORKDIR /usr/app

COPY package*.json /usr/app/

RUN npm install

COPY . .

EXPOSE 8080

CMD [ "npm", "run", "dev" ]
