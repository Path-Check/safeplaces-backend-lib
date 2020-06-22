const { api: _api, server: _server } = require('./src/app')

class Server {

  constructor(config) {
    this._config = config
  }

  get api() {
    return _api
  }

  get router() {
    return _server
  }

  normalizePort(val) {
    var port = parseInt(val, 10);
    if (isNaN(port)) return val;
    if (port >= 0) return port;
    return false;
  }

  getTestingServer() {
    _api.build(this._config.appFolder)
    return _server.app
  }

  start() {
    var port = this.normalizePort(this._config.port || '3000');

    _api.build(this._config.appFolder)

    _api.start(port)
      .then(() => console.log(`Node Server Started on port ${port}!`))
  }
}

module.exports = config => new Server(config)