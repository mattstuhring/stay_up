'use strict';

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config({ silent: true});
}

const express = require('express');
const path = require('path');
const port = process.env.PORT || 8000;

// Middleware
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');

// Routes go here
const users = require('./routes/users');
const token = require('./routes/token');
const products = require('./routes/products');

const app = express();

app.disable('x-powered-by');

switch (app.get('env')) {
  case 'development':
    app.use(morgan('dev'));
    break;

  case 'production':
    app.use(morgan('short'));
    break;

  default:
}

app.use(bodyParser.json());
app.use(cookieParser());

app.use(express.static(path.join('public')));

app.use(users);
app.use(token);
app.use(products);

// error catch all 400
app.use((_req, res, _next) => {
  res.sendStatus(404);
});

// server error handler
app.use((err, _req, res, _next) => {

  if (err.status) {
    return res
      .status(err.status)
      .set('Content-Type', 'plain/text')
      .send(err.message);
  }

  console.error(err);
  res.sendStatus(500);
});

app.listen(port, () => {
  if (process.env.NODE_ENV !== 'test') {
    console.log('Listening on port', port);
  }
});

module.exports = app;
