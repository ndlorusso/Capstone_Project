const express = require("express");
const usersRouter = express.Router();
const JWT = process.env.JWT;

const {
  createUser,
  createUserandToken,
  fetchAllUsers,
  authenticateUser,
  findUserByToken,
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


// <---------------------------  ADMIN SHOULD BE ABLE TO VIEW ALL USERS ---------------------------------------->
usersRouter.get('/', async (req, res, next) => {
  try {
    res.send(await fetchAllUsers());
  } catch (error) {
    next(error);
  }
});

// FIND SPEFIC USER BY ID
usersRouter.get("/:id", async (req, res, next) => {
  try {
    // findUserByToken???
    res.send(await findUserByToken(req.params.id));
  } catch (error) {
    next(error);
  }
});

// LOGIN & AUTHENTICATE
usersRouter.post('/login', async (req, res, next) => {
  const { email, password } = req.body;
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
  try {
    res.send(await createUserandToken(req.body));
    console.log("req.body:", req.body);
  } catch (error ) {
    next(error);
  }
});

module.exports = usersRouter;
