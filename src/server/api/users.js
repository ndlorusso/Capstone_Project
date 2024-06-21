const express = require("express");
const usersRouter = express.Router();
const JWT = process.env.JWT;
// const jwt = require('jsonwebtoken');

const {
  createUser,
  createUserandToken,
  fetchAllUsers,
  // fetchOneUser,
  authenticateUser,
  findUserByToken,
  // getUserByEmail
} = require("../db");
const { createCart } = require("../db/cart");


// isLoggedIn middleware
const isLoggedIn = async (req, res, next ) => {
  try {
    req.user = await findUserByToken(req.headers.authorization);
    next();
  } catch (error) {
    console.log("Error: is Not logged in?");
  }
};

// GET ALL USERS - api/users
// <---------------------------  ADMIN SHOULD BE ABLE TO VIEW ALL USERS ---------------------------------------->
usersRouter.get('/', async (req, res, next) => {
  try {
    res.send(await fetchAllUsers());
  } catch (error) {
    next(error);
  }
});


// FIND SPEFIC USER BY ID
// usersRouter.get("/:id", async (req, res, next) => {
//   try {
//     res.send(await findUserByToken(req.params.id));
//   } catch (error) {
//     next(error);
//   }
// });

// WORKS - login user with token
// /api/users/login
usersRouter.post('/login', async (req, res, next) => {
  const { email, password } = req.body;
  // console.log(email, password);
  if (!email || !password) {
    next({
      name: "MissingCredentialsError",
      message: "Please supply both an email and password",
    });
  }
  try {
    res.send(await authenticateUser(req.body));
    //get user cart
  } catch (err) {
    next(err);
  }
  // createCart();
});

// CREATE USER
// /api/users/register
usersRouter.post("/register", async (req, res, next) => {
  // const { is_admin , username, email, password } = req.body;
  // console.log('req.body:', req.body);
  try {
    res.send(await createUserandToken(req.body));
    console.log("req.body:", req.body);
  } catch (error ) {
    next(error);
  }
});

module.exports = usersRouter;
