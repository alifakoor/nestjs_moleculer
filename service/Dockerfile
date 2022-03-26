FROM node:17-alpine

ENV NODE_ENV=production

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --production

COPY . .

CMD ["npm", "start"]