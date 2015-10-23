// IN PRODUCTION THIS WOULD BE IGNORED ON GITHUB

module.exports = {
  server: {
    name: "App Server",
    port: 3000,
    url: "http://localhost:3000"
  },
  database: {
    pg: {
      username: "kurtdacosta",
      password: null,
      database: "woof",
      host: "0.0.0.0",
      port: "5432",
      dialect: "postgres",
      logging: false,
      forceWipe: true
    }
  },
  sessions: {
    secret: "SOMELONGSESSIONSECRETHERE",
    expiration: 525949
  }
}