'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.createTable('migr_test',{
      id:{
        allowNull : false,
        autoIncreament : true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      testData:{
        type: Sequelize.STRING
      },
      testNumb:{
        type: Sequelize.INTEGER
      },
      testDel:{
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('migr_test');
  }
};
