const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
require('express-async-errors');
const router = require('../routes');
const error = require('../middlewares/error');

const app = express();

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api', router);

app.use(error);

// eslint-disable-next-line import/order
const server = require('http').Server(app);

// eslint-disable-next-line import/order
const socket = require('socket.io')(server);

module.exports = {
  server,
  socket,
};
