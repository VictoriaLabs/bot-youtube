FROM node:18

WORKDIR /usr/src/app

COPY ../src ./

RUN npm install

ENTRYPOINT ["npx", "ts-node", "app.ts" ]