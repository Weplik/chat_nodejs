module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define(
    'Message',
    {
      text: DataTypes.STRING,
    },
    {
      tableName: 'messages',
      underscored: true,
    }
  );

  Message.associate = function(models) {
    Message.belongsTo(models.User, {
      as: 'user',
      onDelete: 'CASCADE',
      foreignKey: {
        name: 'userId',
        allowNull: false,
      },
    });

    Message.belongsTo(models.Room, {
      onDelete: 'CASCADE',
      foreignKey: {
        name: 'roomId',
        allowNull: false,
      },
    });
  };

  return Message;
};
