FROM node:12.10.0

WORKDIR /usr/src/app

COPY package.json /usr/src/app/
COPY package-lock.json /usr/src/app/

RUN npm install --production
COPY src /usr/src/app/src
COPY public /usr/src/app/public

RUN npm run build

COPY server /usr/src/app/server

CMD ["npm", "run", "ss"]
