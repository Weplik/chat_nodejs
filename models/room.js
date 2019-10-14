
module.exports = (sequelize, DataTypes) => {
  const Room = sequelize.define('Room', {
    title: DataTypes.STRING,
  }, {
    tableName: 'rooms',
    underscored: true,
  });
  Room.associate = function (models) {
    Room.hasMany(models.Message, { foreignKey: 'roomId', sourceKey: 'id' });
  };
  return Room;
};
