const { User } = require('../models');

const getUsers = async (req, res) => {
  const { limit = 20, offset = 0 } = req.query;

  const { rows: users, count } = await User.findAndCountAll({ limit, offset });

  return res.json({
    users,
    count,
  });
};

module.exports = {
  getUsers,
};
