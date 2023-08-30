'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('migr_test', [{
      id: 1,
      testData: 'John',
      testNumb: 100,
      testDel: 'justToDelete'
    },{
      id: 2,
      testData: 'John22',
      testNumb: 10022,
      testDel: 'justToDelete22'
    },{
      id: 3,
      testData: 'John33',
      testNumb: 10033,
      testDel: 'justToDelete33'
    },{
      id: 4,
      testData: 'John44',
      testNumb: 10044,
      testDel: 'justToDelete44'
    }], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
