FROM node:21

WORKDIR /usr/src/app

COPY . .

RUN npm install

# equal to npm run start:dev in terminal
CMD ["npm", "run", "start:dev"]
