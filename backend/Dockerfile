from node:latest

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm i

COPY . .

EXPOSE 5000

CMD [ "node","app.js" ]