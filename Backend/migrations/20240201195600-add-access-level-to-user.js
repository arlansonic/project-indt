'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Users', 'accessLevel', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 'common'
    });
  },

  // async down(queryInterface, Sequelize) {
  //   await queryInterface.removeColumn('Users', 'accessLevel');
  // }
};
