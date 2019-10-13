
module.exports = (sequelize, DataTypes) => {
  const Room = sequelize.define('Room', {
    title: DataTypes.STRING,
  }, {
    tableName: 'rooms',
  });
  Room.associate = function (models) {
    Room.hasMany(models.Message, { foreignKey: 'room', sourceKey: 'id' });
  };
  return Room;
};
