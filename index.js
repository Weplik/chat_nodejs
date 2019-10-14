const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
require('express-async-errors');
const router = require('./routes');
const error = require('./middlewares/error');
const { isConnectedToDB } = require('./models');
const logger = require('./helpers/logger');

const app = express();

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api', router);

app.use(error);

isConnectedToDB()
  .then(() => {
    app.listen(8000, () => logger.info('Application successfully started'));
  })
  .catch(err => logger.error(err.message));
