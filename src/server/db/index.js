const { createTables } = require('./seed');
const db = require('./client');
const { fetchAllShoes } = require('./shoes');

const init = async () => {
    console.log('db connect');
    createTables();
    console.log('data seeded');
};
  
init();

module.exports = {
    ...require('./users')
};
