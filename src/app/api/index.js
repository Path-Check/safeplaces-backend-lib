const server = require('../server');
const fs = require('fs');
const path = require('path');

class API {
  build(appPath) {
    fs.readdirSync(`${appPath}/api`).forEach(file => {
      require(`${appPath}/api/${file}`);
    });
  }

  start(port) {
    return server.start(port);
  }
}

module.exports = new API();
