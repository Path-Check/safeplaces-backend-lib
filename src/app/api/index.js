const server = require('../server');
const fs = require('fs');

class API {
  build(appPath) {
    fs.readdirSync(`${appPath}/api`).forEach(file => {
      require(`${appPath}/api/${file}`);
    });
  }

  start(port, bind) {
    return server.start(port, bind);
  }
}

module.exports = new API();
