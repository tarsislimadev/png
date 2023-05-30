const {
  PORT = '80',
} = process.env

module.exports = {
  http: {
    servers: [
      {
        port: PORT,
      }
    ]
  }
}
