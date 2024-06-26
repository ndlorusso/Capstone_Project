const db = require("./client");
const bcrypt = require("bcrypt");
const uuid = require("uuid");
const SALT_COUNT = 12;
const JWT = process.env.JWT;
const jwt = require('jsonwebtoken');


// TEST FOR API.ROUTER
const express = require("express");
const usersRouter = require("../api/users");
const { createCart } = require("./cart");
const id = require("volleyball/lib/id");
const apiRouter = express.Router();

// CREATE USER FUNCTION
const createUser = async ({ is_admin, email, password }) => {
  const SQL = `--sql
    INSERT INTO users(id, is_admin, email, password)
    VALUES ($1, $2, $3, $4)
    RETURNING *
    `;
  const response = await db.query(SQL, [
    uuid.v4(),
    is_admin,
    email,
    await bcrypt.hash(password, SALT_COUNT),
  ]);
  const user_id = response.rows[0].id;
  // createCart({user_id});
  return response.rows[0];
};

// READ ALL USERS
const fetchAllUsers = async () => {
  const SQL = `--sql
  SELECT * from users
  `;
  const response = await db.query(SQL);
  return response.rows;
};

// TEST - AUTHENTICATE USER FUNCTION
// FOR LOGIN
const authenticateUser = async ( { email, password } ) => {
  // console.log('authenticate user', email, password);
  const SQL = `--sql
  SELECT id, password
  FROM users
  WHERE email = $1
  `;
  const response = await db.query(SQL, [email]);
  // console.log('response:', response.rows[0].password);
  // console.log((await bcrypt.compare(password, response.rows[0].password)) === true );

  if (!response.rows.length || (await bcrypt.compare(password, response.rows[0].password)) === false ) {
    const error = Error('not authenticated');
    error.status = 401;
    throw error;
  };
  const token = await jwt.sign({id: response.rows[0].id}, JWT);
  const id = response.rows[0].id;
  return { token, id };
};

// FOR REGISTER FUNCITON
const createUserandToken = async ({ email, password }) => {
  const user = await createUser({ email, password });
  const token = await jwt.sign({ id: user.id }, JWT);
  const user_id = user.id;
  createCart({user_id});
  return { token };
};

// FIND USER BY TOKEN FUNCION
const findUserByToken = async (token) => {
  console.log("licnoln");
  console.log('find User by token:', token);
    let id;
    try {
        const payload = await jwt.verify(token, JWT);
        id = payload.id;
    } catch (ex) {
        const error = Error('not authorized');
        error.status = 401;
        throw error;
    }
    const SQL = /*SQL*/ `
    SELECT id, username
    FROM users
    WHERE id = $1
    `
    const response = await db.query(SQL, [id])
    if(!response.rows.length) {
        const error = Error('Not Authorized')
        error.status = 401
        throw error
    }
    return response.rows[0];
};

// TEMPLATE CODE
// const getUser = async({email, password}) => {
//     if(!email || !password) {
//         return;
//     }
//     try {
//         const user = await getUserByEmail(email);
//         if(!user) return;
//         const hashedPassword = user.password;
//         const passwordsMatch = await bcrypt.compare(password, hashedPassword);
//         if(!passwordsMatch) return;
//         delete user.password;
//         return user;
//     } catch (err) {
//         throw err;
//     }
// }

// TEMPLATE CODE
// const getUserByEmail = async(email) => {
//     try {
//         const { rows: [ user ] } = await db.query(`
//         SELECT *
//         FROM users
//         WHERE email=$1;`, [ email ]);

//         if(!user) {
//             return;
//         }
//         return user;
//     } catch (err) {
//         throw err;
//     }
// }

module.exports = {
  createUser,
  fetchAllUsers,
  authenticateUser,
  createUserandToken,
  findUserByToken,
  // getUserByEmail
};
