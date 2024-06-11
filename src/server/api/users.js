const express = require("express");
const usersRouter = express.Router();
const JWT = process.env.JWT;
// const jwt = require('jsonwebtoken');

const {
  createUser,
  fetchAllUsers,
  // fetchOneUser,
  authenticateUser,
  createUserandToken,
  // getUserByEmail
} = require("../db");

// GET ALL USERS - api/users
usersRouter.get('/', async (req, res, next) => {
  try {
    res.send(await fetchAllUsers());
  } catch (error) {
    next(error);
  }
});

// usersRouter.get("/:id", async (req, res, next) => {
//   try {
//     res.send(await authenticateUser(req.params.id));
//   } catch (error) {
//     next(error);
//   }
// });

// WORKS - login user with token
// /api/users/login
usersRouter.post("/login", async (req, res, next) => {
  const { email, password } = req.body;
  console.log(email, password);
  if (!email || !password) {
    next({
      name: "MissingCredentialsError",
      message: "Please supply both an email and password",
    });
  }
  try {
    res.send(await authenticateUser(req.body));
  } catch (err) {
    next(err);
  }
});

// CREATE USER
usersRouter.post("/register", async (req, res, next) => {
  // const { is_admin , username, email, password } = req.body;
  // console.log('req.body:', req.body);
  try {
    res.send(await createUserandToken(req.body));
  } catch ({ email, message }) {
    next({ email, message });
  }

});

module.exports = usersRouter;
