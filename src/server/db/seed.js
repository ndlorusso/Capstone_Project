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
    displayname VARCHAR(20) UNIQUE NOT NULL,
    email VARCHAR(20) UNIQUE NOT NULL,
    password VARCHAR(20) NULL,
    is_admin BOOLEAN DEFAULT false
   );

   CREATE TABLE shoes(
    id UUID PRIMARY KEY,
    brand VARCHAR(20) NOT NULL
   );

   CREATE TABLE cart(
    id UUID PRIMARY KEY,
    price INTEGER NOT NULL
    user_id REFERENCES users(id) NOT NULL,
    CONSTRAINT unique_user_cart UNIQUE (user_id)
   );
  `;
  const response = await db.query(SQL);
  return response.rows;
};

// shoes
// user_id UUID REFERENCES users(id) NOT NULL,
// CONSTRAINT unique_user_shoe UNIQUE(shoe_id, user_id)

// cart 
// user_id REFERENCES users(id) NOT NULL,
// shoe_id REFERENCES shoes(id) NOT NULL,
// CONSTRAINT unique user_cart UNIQUE (user_id)


const init = async () => {
  await db.connect();
  console.log("client connect");
  createTables();
};

init();
