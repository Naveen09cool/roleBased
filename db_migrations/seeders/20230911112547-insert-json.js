'use strict';
const data = require('./master/data.json')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('migr_test', data, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('migr_test', null, {});
  }
};
