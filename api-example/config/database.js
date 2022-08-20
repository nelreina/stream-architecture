module.exports = ({ env }) => ({
  defaultConnection: "default",
  connections: {
    default: {
      connector: "bookshelf",
      settings: {
        client: "postgres",
        host: env("DATABASE_HOST", "localhost"),
        port: env.int("DATABASE_PORT", 5432),
        database: env("DATABASE_NAME", "strapi"),
        username: env("DATABASE_USERNAME", "postgres"),
        password: env("DATABASE_PASSWORD", "0000"),
        schema: "public",
      },
      options: {
        pool: {
          min: env.int("DATABASE_OPTIONS_POOL_MIN", 5),
          max: env.int("DATABASE_OPTIONS_POOL_MAX", 20),
          acquireTimeoutMillis: env.int("DATABASE_OPTIONS_POOL_TIMEOUT", 10000),
          createTimeoutMillis: env.int("DATABASE_OPTIONS_POOL_TIMEOUT", 10000),
        },
      },
    },
  },
});
