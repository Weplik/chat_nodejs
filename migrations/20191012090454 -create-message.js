
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('messages', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    text: {
      type: Sequelize.STRING,
    },
    createdAt: {
      field: 'created_at',
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      field: 'updated_at',
      allowNull: false,
      type: Sequelize.DATE,
    },
    userId: {
      field: 'user_id',
      type: Sequelize.STRING,
      onDelete: 'CASCADE',
      allowNull: false,
      references: {
        model: 'users',
        key: 'username',
      },
    },
    roomId: {
      field: 'room_id',
      type: Sequelize.INTEGER,
      onDelete: 'CASCADE',
      allowNull: false,
      references: {
        model: 'rooms',
        key: 'id',
      },
    },
  }),
  down: (queryInterface) => queryInterface.dropTable('messages'),
};
