FROM node:16-bullseye-slim
ENV NODE_ENV=prodcution
ENV REDIS_HOST=172.17.0.1

EXPOSE 1337

RUN mkdir /app && chown -R node:node /app
WORKDIR /app
USER node
COPY --chown=node:node package.json package-lock*.json ./
RUN npm i
RUN npm run build
COPY --chown=node:node . .
CMD ["node", "server.js"]


