const bcrypt = require('bcrypt');

const { password: config } = require('../config/config');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      username: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
      },
      firstname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: 'users',
      underscored: true,
      defaultScope: {
        attributes: { exclude: ['password'] },
      },
    }
  );

  User.associate = function(models) {
    User.hasMany(models.Message, {
      foreignKey: 'userId',
      sourceKey: 'username',
      as: 'user',
    });
  };

  User.prototype.isCorrectPassword = function(password) {
    return bcrypt.compare(password, this.password);
  };

  User.beforeCreate(
    (user, options) =>
      new Promise((resolve, reject) => {
        bcrypt.hash(user.password, config.salt, (err, hash) => {
          if (err) {
            reject(err);
          } else {
            // eslint-disable-next-line no-param-reassign
            user.password = hash;
            resolve(user, options);
          }
        });
      })
  );

  return User;
};
