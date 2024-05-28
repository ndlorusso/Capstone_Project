const { createTables } = require('./seed');
const db = require('./client');
const { fetchAllShoes } = require('./shoes');

const init = async () => {
    console.log('db connect');
    createTables();
    console.log('data seeded');
    fetchAllShoes();
    console.log('get all shoes');
};
  
init();

module.exports = {
    ...require('./users')
};
