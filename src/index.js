const { api: _api, server: _server } = require('./app')

class Server {

  constructor(config) {
    this._config = config
    _server.setWrapAsync(this._config.wrapAsync)
  }

  get api() {
    return _api
  }

  get router() {
    return _server
  }

  setupAndCreate() {
    _server.setup()
    _server.create()
  }

  setup() {
    _server.setup()
  }

  create() {
    _server.create()
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
    var bind = this._config.bind || '127.0.0.1'

    _api.build(this._config.appFolder)

    _api.start(port, bind)
      .then(() => console.log(`Node Server Started on port ${port}!`))
  }
}

module.exports = config => new Server(config)