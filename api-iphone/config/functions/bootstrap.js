"use strict";

const {
  newEventStreamService: EventStream,
} = require("@nelreina/redis-stream-consumer-commonjs");

const { client } = require("../../lib/redis-client");
const { handler } = require("../../lib/redis-stream-handler");

const STREAM = process.env["STREAM"];
const SERVICE_NAME = process.env["SERVICE_NAME"];

const shutdown = async () => {
  try {
    strapi.log.info("Disconnecting from redis...");
    await client.disconnect();
    process.exit(0);
  } catch (error) {
    strapi.log.error(error.message);
    process.exit(1);
  }
};
global.redis = client;
const EVENTS = ["EXAMPLE_EVENT"]; // All events

module.exports = async () => {
  try {
    // Check missing unpaid declarations

    if (!client.isOpen) await client.connect();
    if (client.isOpen) {
      strapi.log.info("Successfully connected to redis");
      const msg = await EventStream(
        client,
        STREAM,
        SERVICE_NAME,
        EVENTS,
        handler,
        "$"
      );
      strapi.log.info(msg);

      process.on("SIGINT", shutdown);
      process.on("SIGTERM", shutdown);
    } else {
      strapi.log.error("Could not connect to Redis client!");
    }
  } catch (error) {
    strapi.log.error(error.message);
  }
};
