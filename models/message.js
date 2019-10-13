
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
        name: 'user',
        allowNull: false,
      },
    });

    Message.belongsTo(models.Room, {
      onDelete: 'CASCADE',
      foreignKey: {
        name: 'room',
        allowNull: false,
      },
    });
  };

  return Message;
};
