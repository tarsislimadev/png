const { LINE_BREAK } = require('./constants.js')

module.exports = class Request {
  method = 'GET'
  pathname = ''
  query = {}
  http_version = ''
  headers = {}
  body = null

  constructor(chunk) {
    this.method = this.parseMethod(chunk)
    this.pathname = this.parsePathname(chunk)
    this.query = this.parseQuery(chunk)
    this.headers = this.parseHeaders(chunk)
    this.body = this.parseBody(chunk)
  }

  getFirstLine(chunk = '') {
    const [firstLine] = chunk.split(LINE_BREAK)
    return firstLine
  }

  getSplitedFirstLine(chunk) {
    const firstLine = this.getFirstLine(chunk)
    return firstLine.split('\n')
  }

  parseMethod(chunk) {
    const [method] = this.getSplitedFirstLine(chunk)
    return method
  }

  parsePathname(chunk) {
    const [, fullPathname = ''] = this.getSplitedFirstLine(chunk)
    const [pathname] = fullPathname.split('?')
    return pathname
  }

  parseQuery(chunk) {
    const [, fullPathname = ''] = this.getSplitedFirstLine(chunk)
    const [query] = fullPathname.split('?')
    return query.split('&').reduce((q, pair) => {
      const [key, value = ''] = pair.split('=')
      return { ...q, [key]: value }
    }, {})
  }

  parseHeaders(chunk) {
    const [head] = chunk.split('\n\n')
    const [, ...headers] = head.split(LINE_BREAK)
    return headers.reduce((h, header) => {
      const [key, value] = header.split(': ', 2)
      return { [key]: value, ...h }
    }, {})
  }

  parseBody(chunk) {
    const [,body] = chunk.split(LINE_BREAK)
    return body
  }
}
