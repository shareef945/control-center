FROM node:17-alpine

WORKDIR /src

COPY package.json ./

RUN npm install --omit=dev

COPY . .

RUN npm run build

EXPOSE 3005 

CMD ["node", "build/server.js"]