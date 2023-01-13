const {v4} =require('uuid');
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users', [{
      
      Fullname: 'Umwari Rachel',
      email: 'rachel@admin.com',
      password:'$2a$10$6//9CmG4NV13fO/KGreC7uejlgaY3i16FuAMmAX7wyuPSi.y4lqYa',
      role:'Admin',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {});
  }
};
