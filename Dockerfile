FROM node:alpine
RUN mkdir /app
WORKDIR /app
COPY . /app

ENV NODE_ENV=production

RUN npm install --production --silent

CMD ["npm", "start"]