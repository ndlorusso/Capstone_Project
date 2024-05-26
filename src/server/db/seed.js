require('dotenv').config();
const pg = require('pg');
const uuid = require('uuid');
const db = require('./client');
const { createUser } = require('./users');
const { createShoe } = require('./shoes');

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
  const response = await db.query(SQL);
  return response.rows;
};


// cart 
// user_id REFERENCES users(id) NOT NULL,
// shoe_id REFERENCES shoes(id) NOT NULL,
// CONSTRAINT unique user_cart UNIQUE (user_id)