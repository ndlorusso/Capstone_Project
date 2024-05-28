const db = require('./client')
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const SALT_COUNT = 12;
const JWT = process.env.JWT;

// TEST FOR API.ROUTER
const express = require('express');
const usersRouter = require('../api/users');
const apiRouter = express.Router();

// CREATE USER FUNCTION
const createUser = async ({ is_admin, username, email, password }) => {
    const SQL = `--sql
    INSERT INTO users(id, is_admin, username, email, password)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *
    `;
    const response = await db.query(SQL, [uuid.v4(), is_admin, username, email, await bcrypt.hash(password, SALT_COUNT)]);
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

// AUTHENTICATE USER FUNCTION
// const authenticateUser = async ({ username, password }) => {
//     const SQL = `--sql 
//     SELECT id, password
//     FROM users
//     WHERE username = $1
//     `;
    
//     const response = await db.query(SQL, [username])
//     if (!response.rows.length || await bcrypt.compare(password, response.rows[0].password) === false) {
//         const error = Errpr('not authenticated user');
//         error.status = 401;
//         throw error;
//     }
//     const token = await JWT.sign({id: response.rows[0].id}, JWT);
//     return { token: token};
// };

// FIND USER BY TOKEN FUNCION
// const findUserByToken = async (token) => {
//     let id
//     try {
//         const payload = await jwt.verify(token, JWT)
//         id = payload.id
//     } catch (ex) {
//         const error = Error('not authorized')
//         error.status = 401
//         throw error
//     }
//     const SQL = /*SQL*/ `
//     SELECT id, username
//     FROM users
//     WHERE id = $1
//     `
//     const res = await client.query(SQL, [id])
//     if(!res.rows.length) {
//         const error = Error('Not Authorized')
//         error.status = 401
//         throw error
//     }
//     return res.rows[0]
// }

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
    // getUserByEmail
};