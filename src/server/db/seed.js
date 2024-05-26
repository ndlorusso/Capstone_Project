require('dotenv').config();
const pg = require('pg');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const db = require('./client');
const { createUser } = require('./users');

const createTables = async () => {
  const SQL = `--sql
  DROP TABLE IF EXISTS cart;
  DROP TABLE IF EXISTS shoes;
  DROP TABLE IF EXISTS users;

CREATE TABLE users(
  id UUID PRIMARY KEY,
  is_admin BOOLEAN DEFAULT false,
  username VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL
  );

CREATE TABLE shoes(
  id UUID PRIMARY KEY,
  brand VARCHAR(255) NOT NULL,
  size INTEGER NOT NULL,
  color VARCHAR(255) NOT NULL
  );

CREATE TABLE cart(
  id UUID PRIMARY KEY,
  price INTEGER NOT NULL,
  user_id UUID REFERENCES users(id) NOT NULL,
  CONSTRAINT unique_user_cart UNIQUE (user_id)
  );
  `;
  const response = await db.query(SQL);
  return response.rows;
};

const init = async () => {
  await db.connect();
  console.log('db connect');
  createTables();

  const [nick, brendan, desiree] = await Promise.all([
    createUser({id_admin: true, username: 'ndlorusso', password: 'abc123'}),
    createUser({id_admin: false, username: 'brendan123', password: 'qwe123'}),
    createUser({id_admin: false, username: 'desiree123', password: 'zxc3'})
  ]);
};
init();

// cart 
// user_id REFERENCES users(id) NOT NULL,
// shoe_id REFERENCES shoes(id) NOT NULL,
// CONSTRAINT unique user_cart UNIQUE (user_id)