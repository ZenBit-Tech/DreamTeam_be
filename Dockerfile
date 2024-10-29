FROM node:20.11.1 AS server-builder

WORKDIR /delivery-api
COPY package*.json ./
RUN npm install

COPY . .

COPY ./dist ./dist

CMD ["npm", "run", "start:dev"]