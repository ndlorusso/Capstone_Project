const { createUser } = require('./users')
const { createShoe } = require('./shoes');

const init = async () => {
    await db.connect();
    console.log('db connect');
    createTables();
  
    const [nick, brendan, desiree] = await Promise.all([
      createUser({id_admin: false, username: 'ndlorusso', email: 'nick@gmail.com', password: 'abc123'}),
      createUser({id_admin: false, username: 'brendan123', email: 'brendan@gmail.com', password: 'qwe123'}),
      createUser({id_admin: false, username: 'desiree123', email: 'desiree@gmail.com', password: 'zxc3'})
    ]);
  
    const [shoe1, shoe2, shoe3] = await Promise.all([
      createShoe({brand: 'crocs', size: 10, price: 60, color: 'navy'}),
      createShoe({brand: 'grundens', size: 8, price: 120, color: 'shrimp'}),
      createShoe({brand: 'jordans', size: 11, price: 220, color: 'black'}),
    ])
  };
  
init();

module.exports = {
    ...require('./users')
};