
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('users', {
    username: {
      type: Sequelize.STRING,
      primaryKey: true,
      allowNull: false,
    },
    firstname: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    lastname: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    isEnabled: {
      field: 'is_enabled',
      type: Sequelize.BOOLEAN,
      defaultValue: true,
    },
  }),
  down: (queryInterface) => queryInterface.dropTable('users'),
};
