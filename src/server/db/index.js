const { createUser } = require('./users')
const { createShoe } = require('./shoes');
const { createTables } = require('./seed');
const db = require('./client');

const init = async () => {
    console.log('db connect');
    createTables();
    console.log('data seeded');
};
  
init();

module.exports = {
    ...require('./users')
};
 // await db.connect(); line 7