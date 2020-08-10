# SafePlaces Server Library

The SafePlaces Server library is a pre-built Express server used across all SafePlaces services. A full example of how to integrate this library into an existing service can be found in the `sample/` directory.

## Environment Variables

A single environment variable is required to configure the port that the server should run on.

```
EXPRESS_PORT=3000
```

## Installation and Usage

Install with npm or yarn

```
npm install @pathcheck/safeplaces-server

-or-

yarn add @pathcheck/safeplaces-server
```

Once installed, create an `app.js` file at the root level and add the following:

```
const path = require('path');

const config = {
  port: process.env.EXPRESS_PORT || '3000',
  bind: '127.0.0.1',
  appFolder: path.join(__dirname, 'app'),
  wrapAsync: (asyncFn, validate = false) => {
    return (req, res, next) => {
      if (validate) {
        // Do some sort of validation here.
      }
      asyncFn(req, res, next).catch(next);
    };
  },
};

const server = require('@pathcheck/safeplaces-server')(config);
const enforcer = require('./app/lib/auth');

server.setupAndCreate();

module.exports = server;

```

### Options

The following are a list of options that can be passed to the server for further customization:

- `port`: port to run the server on
- `bind`: bind address
- `appFolder`: folder where your application logic exists
- `wrapAsync`: method for handling async/await methods within routes.  Will also handle validation.

### Starting the server

Below is example code of how to start the server (normally located in `bin/www`).

```
#!/usr/bin/env node

require('dotenv').config()

const server = require('../app');

server.start()
```

### Routes

Below is example code of how to add a route to the server.

```
const { router } = require('../../../app');
const controller = require('./controller');

router.post(
  '/signup',
  router.wrapAsync(
    async (req, res) => await controller.signupAction(req, res),
    true,
  ),
);
```
