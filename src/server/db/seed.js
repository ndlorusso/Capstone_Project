const db = require('./client');
const { createUser } = require('./users');
const { createShoe } = require('./shoes');
const { createCart } = require('./cart');

const createTables = async () => {
  const SQL = `--sql
  DROP TABLE IF EXISTS cart;
  DROP TABLE IF EXISTS shoes;
  DROP TABLE IF EXISTS users;

CREATE TABLE users(
  id UUID PRIMARY KEY,
  is_admin BOOLEAN DEFAULT false,
  username VARCHAR(255) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL, 
  password VARCHAR(255) NOT NULL
  );

CREATE TABLE shoes(
  id UUID PRIMARY KEY,
  brand VARCHAR(255) NOT NULL,
  size INTEGER NOT NULL,
  price INTEGER NOT NULL,
  color VARCHAR(255) NOT NULL
  );

CREATE TABLE cart(
  id UUID PRIMARY KEY,
  total_price INTEGER NOT NULL,
  user_id UUID REFERENCES users(id) NOT NULL,
  CONSTRAINT unique_user_cart UNIQUE (user_id)
  );
  `;
   await db.query(SQL);

  const [nick, brendan, desiree] = await Promise.all([
    createUser({id_admin: false, username: 'ndlorusso', email: 'nick@gmail.com', password: 'abc123'}),
    createUser({id_admin: false, username: 'brendan123', email: 'brendan@gmail.com', password: 'qwe123'}),
    createUser({id_admin: false, username: 'desiree123', email: 'desiree@gmail.com', password: 'zxc3'})
  ]);

  const [shoe1, shoe2, shoe3] = await Promise.all([
    createShoe({brand: 'crocs', size: 10, price: 60, color: 'navy'}),
    createShoe({brand: 'grundens', size: 8, price: 120, color: 'shrimp'}),
    createShoe({brand: 'jordans', size: 11, price: 220, color: 'black'})
  ]);

  const [cart1, cart2, cart3] = await Promise.all([
    createCart({total_price: 200, user_id: nick.id }),
    createCart({total_price: 300, user_id: brendan.id }),
    createCart({total_price: 400, user_id: desiree.id })
  ]);
};

module.exports = {
  createTables,
};