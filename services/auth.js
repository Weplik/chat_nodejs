const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
const RequestError = require('../helpers/RequestError');

const env = process.env.NODE_ENV || 'development';
const { jwt: config } = require('../config/config')[env];

const signIn = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw new RequestError(422, 'Invalid data', errors.array());
  }

  const { username, password } = req.body;

  const user = await User.findByPk(username);

  if (!user) {
    throw new RequestError(404, 'User not found');
  }

  const isCorrectPassword = await user.isCorrectPassword(password);

  if (!isCorrectPassword) {
    throw new RequestError(400, 'Password is incorrect');
  }

  const accessToken = jwt.sign(
    { username: user.dataValues.username },
    config.secret,
    { expiresIn: config.accessTokenExpiresIn },
  );

  const refreshToken = jwt.sign(
    { username: user.dataValues.username },
    config.secret,
    { expiresIn: config.refreshTokenExpiresIn },
  );

  return res.json({
    accessToken,
    refreshToken,
  });
};

const generateTokens = async (req, res) => {
  const { token } = req.body;

  const { username } = jwt.verify(token, config.secret);

  if (!username) {
    throw new RequestError(403, 'Unauthorized');
  }

  const accessToken = jwt.sign(
    { username },
    config.secret,
    { expiresIn: config.accessTokenExpiresIn },
  );

  const refreshToken = jwt.sign(
    { username },
    config.secret,
    { expiresIn: config.refreshTokenExpiresIn },
  );

  return res.json({
    accessToken,
    refreshToken,
  });
};

const signUp = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw new RequestError(422, 'Invalid data', errors.array());
  }

  const user = req.body;

  const isExistUser = !!(await User.findByPk(user.username));

  if (isExistUser) {
    throw new RequestError(400, 'User is exist');
  }

  await User.create(user);

  return res.sendStatus(201);
};

module.exports = {
  signIn,
  generateTokens,
  signUp,
};
