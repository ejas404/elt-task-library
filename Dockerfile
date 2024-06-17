FROM node:21

WORKDIR /app


COPY package.json .

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3344

ENTRYPOINT ["sh", "/usr/local/bin/docker-entrypoint.sh"]

CMD ["npm", "run", "start:prod"]

