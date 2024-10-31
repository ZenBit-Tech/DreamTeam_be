FROM node:20-alpine as builder

WORKDIR /delivery

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "run", "start:dev"]