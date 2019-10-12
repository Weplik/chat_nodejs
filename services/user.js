const { User } = require('../models');
const RequestError = require('../helpers/RequestError');

const getUserByUsername = async (req, res) => {
  const { username } = req.params;

  if (!username) {
    throw new RequestError(400, 'Username required');
  }

  const user = await User.findByPk(username);

  if (!user) {
    throw new RequestError(404, 'User not found');
  }

  return res.json(user.dataValues);
};

const getUsers = async (req, res) => {
  const { limit = 20, offset = 0 } = req.params;

  const { rows: users, count } = await User.findAndCountAll({ limit, offset });

  return res.json({
    users,
    count,
  });
};

module.exports = {
  getUserByUsername,
  getUsers,
};
