FROM node

WORKDIR /usr/src/app

COPY package.json /usr/src/app/
COPY package-lock.json /usr/src/app/

RUN npm install --production
COPY . /usr/src/app/
RUN npm run build

CMD ["npm", "run", "ss"]
