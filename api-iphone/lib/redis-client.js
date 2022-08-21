const { createClient } = require("redis");

const SERVICE_NAME = process.env["SERVICE_NAME"];
const REDIS_HOST = process.env["REDIS_HOST"];
const REDIS_PORT = process.env["REDIS_PORT"] || 6379;
const REDIS_USER = process.env["REDIS_USER"];
const REDIS_PW = process.env["REDIS_PW"];

let url;
if (REDIS_HOST) {
  url = "redis://";
  if (REDIS_USER && REDIS_PW) {
    url += `${REDIS_USER}:${REDIS_PW}@`;
  }
  url += `${REDIS_HOST}:${REDIS_PORT}`;
}

const client = createClient({ url, name: SERVICE_NAME });

exports.client = client;
