const netPkg = require('net')
const { http: { servers: [{ port: PORT }] } } = require('./config.js')

const Logger = require('./logger.js')
const log = new Logger('API')

const { Request, Response } = require('./libs/http/index.js')

const { createImage } = require('./app.js')

const server = netPkg.createServer((socket) => {
  socket.on('data', (chunk) => {
    console.log('data', chunk.toString())
    //
    const req = new Request(chunk.toString())
    const res = new Response(req)
    //
    socket.write(createImage(req, res).toString())
    socket.end()
  })
})

server.listen(PORT, () => log.info(`Server listening on ${PORT}`))
