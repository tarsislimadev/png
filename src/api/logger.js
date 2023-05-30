
module.exports = class Logger {
  name = []

  constructor(name) {
    this.name.push(name)
  }

  info(...params) {
    console.info(this.name.join('.'), ...params)
  }

}
