FROM node:16-alpine

WORKDIR /app

ENV NODE_ENV=production

COPY . .

RUN npm install
RUN npm i -g sequelize-cli

EXPOSE 3000

CMD ["npm", "start"]
