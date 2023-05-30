const Request = require('./request.js')

module.exports = class Response {
  req = null

  constructor(req = new Request('')) {
    this.req = req
  }

  getFirstLine() {
    return 'HTTP/1.1 200 OK'
  }

  getHeaders() {
    const headers = []
    headers.push('Content-Type: image/png')
    return headers
  }

  getBody() {
    return '{}'
  }

  toString() {
    const res = [
      this.getFirstLine(),
      ...this.getHeaders(),
      '',
      this.getBody(),
      '',
    ].join('\r\n')

    return Buffer.from(res)
  }
}
