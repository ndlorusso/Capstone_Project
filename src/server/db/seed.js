require("dotenv").config();
const pg = require("pg");
const uuid = require("uuid");
const db = require("./client");
// const { createUser } = require("./users");
// const { createShoe } = require("./shoes");

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
const insertData = async () => {
  const users = [
    {
      id: uuid.v4(),
      is_admin: false,
      username: "Angel Reece",
      password: "BR",
    },
    {
      id: uuid.v4(),
      is_admin: false,
      username: "Shaq",
      password: "LSU",
    },
    // Add more users as needed
  ];

  const shoes = [
    {
      id: uuid.v4(),
      brand: "Nike",
      size: 10,
      color: "Red",
    },
    {
      id: uuid.v4(),
      brand: "Adidas",
      size: 9,
      color: "Blue",
    },
  ];

  const cart = [
    {
      id: uuid.v4(),
      price: 100,
      user_id: users[0].id,
    },
    {
      id: uuid.v4(),
      price: 80,
      user_id: users[1].id,
    },
    // cart items
  ];

  // Inserting users
  for (const user of users) {
    await db.query(
      "INSERT INTO users (id, is_admin, username, password) VALUES ($1, $2, $3, $4)",
      [user.id, user.is_admin, user.username, user.password]
    );
  }

  // Inserting shoes
  for (const shoe of shoes) {
    await db.query(
      "INSERT INTO shoes (id, brand, size, color) VALUES ($1, $2, $3, $4)",
      [shoe.id, shoe.brand, shoe.size, shoe.color]
    );
  }

  // Inserting cart items
  for (const item of cart) {
    await db.query(
      "INSERT INTO cart (id, price, user_id) VALUES ($1, $2, $3)",
      [item.id, item.price, item.user_id]
    );
  }
};

const init = async () => {
  await db.connect();
  console.log("db connect");
  await createTables();
  await insertData();
};

init();
