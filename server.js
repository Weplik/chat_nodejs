const { server } = require('./config/app');
const { isConnectedToDB } = require('./models');
const logger = require('./helpers/logger');

isConnectedToDB()
  .then(() => {
    server.listen(8000, () => logger.info('Application successfully started'));
  })
  .catch(err => logger.error(err.message));
