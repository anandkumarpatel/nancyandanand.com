FROM node

WORKDIR /usr/src/app

COPY package.json /usr/src/app/
COPY package-lock.json /usr/src/app/

RUN npm install --production
COPY . /usr/src/app/

CMD ["npm", "run", "ss"]
