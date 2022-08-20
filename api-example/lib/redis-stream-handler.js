const { addToEventLog } = require("@nelreina/redis-stream-consumer-commonjs");
const { client } = require("./redis-client");

const STREAM = process.env["STREAM"];

module.exports = {
  async handler(streamData) {
    const { streamId, event, aggregateId, payload, ack } = streamData;
    strapi.log.info(JSON.stringify({ SERVICE_NAME, event }));
    if (event === "EXAMPLE_EVENT") {
      const ok = await strapi.services.foo.example(aggregateId, payload);
      if (ok) {
        await ack(streamId);
      }
    }
  },

  async addToStream(event, declarationId, payload) {
    const streamData = {
      streamKeyName: STREAM,
      aggregateId: declarationId,
      payload,
      event,
      serviceName: SERVICE_NAME,
    };
    strapi.log.info(JSON.stringify(streamData));
    await addToEventLog(client, streamData);
  },
};
