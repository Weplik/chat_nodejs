
module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define('Message', {
    text: DataTypes.STRING,
  }, {
    tableName: 'messages',
  });

  Message.associate = function (models) {
    Message.belongsTo(models.User, {
      onDelete: 'CASCADE',
      foreignKey: {
        allowNull: false,
      },
    });

    Message.belongsTo(models.Room, {
      onDelete: 'CASCADE',
      foreignKey: {
        allowNull: false,
      },
    });
  };

  return Message;
};
