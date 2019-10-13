const jwt = require('jsonwebtoken');
const RequestError = require('../helpers/RequestError');

const env = process.env.NODE_ENV || 'development';
const { jwt: config } = require('../config/config')[env];

const auth = async (req, res, next) => {
  const token = req.get('Authorization') ? req.get('Authorization').slice(7) : null;

  if (!token) {
    throw new RequestError(401, 'Unauthorized');
  }

  const { username } = jwt.verify(token, config.secret);

  req.user = username;

  next();
};

module.exports = auth;
