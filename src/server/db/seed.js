require('dotenv').config();
const pg = require('pg');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const db = require('./client');
const { createUser } = require('./users');

const users = [
  {
    name: 'Emily Johnson',
    email: 'emily@example.com',
    password: 'securepass',
  },
  {
    name: 'Liu Wei',
    email: 'liu@example.com',
    password: 'strongpass',
  },
  {
    name: 'Isabella García',
    email: 'bella@example.com',
    password: 'pass1234',
  },
  {
    name: 'Mohammed Ahmed',
    email: 'mohammed@example.com',
    password: 'mysecretpassword',
  },
  {
    name: 'John Smith',
    email: 'john@example.com',
    password: 'password123',
  },
];  

const shoes = [
  {brand:'Jordan',
   model:'III',
   color: "red/black",
  }
];

// const dropTables = async () => {
//     try {
//         await db.query(`
//         DROP TABLE IF EXISTS users;
//         `)
//     }
//     catch(err) {
//         throw err;
//     }
// }

// const createTables = async () => {
//     try {
//         await db.query(`--sql
//         CREATE TABLE users(
//             id SERIAL PRIMARY KEY,
//             name VARCHAR(255) DEFAULT 'name',
//             email VARCHAR(255) UNIQUE NOT NULL,
//             password VARCHAR(255) NOT NULL
//         )`)
//     }
//     catch(err) {
//         throw err;
//     }
// }

const createTables = async () => {
  const SQL = `--sql
  DROP TABLE IF EXISTS cart;
  DROP TABLE IF EXISTS shoes;
  DROP TABLE IF EXISTS users;

  CREATE TABLE users(
    id UUID PRIMARY KEY,
    displayname VARCHAR(20) UNIQUE NOT NULL,
    email VARCHAR(20) UNIQUE NOT NULL,
    password VARCHAR(20) NULL
   );

   CREATE TABLE shoes(
    id UUID PRIMARY KEY,
   );

   CREATE TABLE cart(
    id UUID PRIMARY KEY,
   );
  `;
  const response = await client.query(SQL);
  return response.rows;
};

// shoes
// user_id UUID REFERENCES users(id) NOT NULL,
// CONSTRAINT unique_user_shoe UNIQUE(shoe_id, user_id)

// cart 
// user_id REFERENCES users(id) NOT NULL,
// shoe_id REFERENCES shoes(id) NOT NULL,
// CONSTRAINT unique user_cart UNIQUE (user_id)


const createUser = async ({ username, password }) => {
  const SQL = `--sql
  INSERT INTO users(id, username, password)
  VALUES ($1, $2, $3)
  RETURNING *
  `;
  const response = await client.query(SQL, [uuid.v4(), username , await bcrypt.hash(password, 12)]);
  return response.rows[0];
};

const createShoe = async ({ brand, model, color, condition, price, userId }) => {
  const SQL = `--sql
  INSERT INTO shoes(id, brand, model, color, condition, price, userId)
  VALUES ($1, $2, $3, $4, $5, $6, $7)
  RETURNING *
  `;
  const response = await client.query(SQL, [uuid.v4(), brand, model, color, condition, price, userId]);
  return response.rows[0];
};

// const insertUsers = async () => {
//   try {
//     for (const user of users) {
//       await createUser({name: user.name, email: user.email, password: user.password});
//     }
//     console.log('Seed data inserted successfully.');
//   } catch (error) {
//     console.error('Error inserting seed data:', error);
//   }
// };

// const init = async () => {
//     try {
//         db.connect();
//         // await dropTables();
//         await createTables();
//         // await insertUsers();
//     }
//     catch (err) {
//         throw err;
//     }
//     finally {
//         db.end()
//     }
// }

const init = async () => {
  await client.connect();
  console.log("client connect");
  createTables();
};

init();
