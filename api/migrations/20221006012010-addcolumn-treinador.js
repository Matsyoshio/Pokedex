/* eslint-disable no-unused-vars */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Treinadores', 'deletedAt', {
      allowNull: true,
      type: Sequelize.DATE,
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Treinadores', 'deletedAt');
  },
};
