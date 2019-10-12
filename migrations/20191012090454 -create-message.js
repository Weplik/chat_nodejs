
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
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    user: {
      type: Sequelize.STRING,
      onDelete: 'CASCADE',
      allowNull: false,
      references: {
        model: 'users',
        key: 'username',
      },
    },
    room: {
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
