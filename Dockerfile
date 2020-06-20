FROM node:8.10.0

RUN mkdir -p /submission/node_modules && chown -R node:node /submission

WORKDIR /submission

COPY package*.json ./

USER node

RUN npm install

COPY --chown=node:node . .

ENTRYPOINT [ "node", "app.js" ]

CMD [ "./data.json", "./result.json" ]