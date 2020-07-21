# Safepaths Express Server Smple

Pre-built Express server that allows you to get up and running quickly.

Under the hood this utilizes Express and Mongo to get you up and running quickly with very little setup.  Additionally I am fond of Papertrail so I use that for logging.

## Environment Variables

The config is currently pre-setup for you so all you need to do is provide the correct environment variables.

```
PORT=3000
```

## Installation and Usage

Install by enter one of the commands below.

```
npm install @pathcheck/safeplaces-server

-or-

yarn add @pathcheck/safeplaces-server
```

Once installed, create an `app.js` file at the root level and drop the following code into it.

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

By placing this at the root level it can be pulled into any part of your app and utilized.

#### Example of starting the server.

```
#!/usr/bin/env node

require('dotenv').config()

const server = require('../app');

server.start()
```

## Options

Below are the option you can pass into 

- `port`: Port that you wish to use.
- `bind`: Bind address
- `appFolder`: Folder where your application logic exists in. (See below)
- `wrapAsync`: method for handling async/await methods within routes.  Will also handle validation.

#### App Folder

We try to keep all application logic in a folder called `app`. In it, contains all of the Routes, and Controllers you need to make your app work.

Within the `app` folder shoud be an `api` folder.

When the server starts it will run through this `api` folder and gather all the routes.

The best way to familiarize yourself with this setup is to take a look at the `sample` folder.

... More to follow.