FROM node:21

ENTRYPOINT ["sh", "/usr/local/bin/docker-entrypoint.sh"]

WORKDIR /usr/src/app

COPY . .

RUN npm install

EXPOSE 3344

# equal to npm run start:dev in terminal
CMD ["npm", "run", "start:dev"]


