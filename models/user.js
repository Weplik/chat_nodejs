
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
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
    isEnabled: {
      field: 'is_enabled',
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    tableName: 'users',
  });

  User.associate = function (models) {
    User.hasMany(models.Message);
  };

  return User;
};
