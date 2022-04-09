module.exports = {
  async up (queryInterface) {
    await queryInterface.bulkInsert('users', [{
      id: 1,
      name: 'Абдувохид',
      email: 'abduvohid1996@inbox.ru',
      password: 'KwRFw9fnt2nSFaL9',
    }], {})
  },

  async down (queryInterface) {
    await queryInterface.bulkDelete('users', { where: { id: 1 } }, {})
  }
}
