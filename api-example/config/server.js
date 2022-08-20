module.exports = ({ env }) => {
  const proxy = env.bool("PROXY", false);
  const production = env.bool("PROD", false);
  console.log("LOG:  ~ file: server.js ~ line 4 ~ production", production);
  console.log("LOG:  ~ file: server.js ~ line 3 ~ proxy", proxy);

  return {
    host: env("HOST", "0.0.0.0"),
    port: 1337,
    url: production ? env("URL") + "/api-example" : env("DEV_URL"),
    proxy,
    production,
    admin: {
      auth: {
        secret: env("ADMIN_JWT_SECRET", "06a0680abc685ed34d03a346aedba7e3"),
      },
    },
    cron: {
      enabled: true,
    },
  };
};
