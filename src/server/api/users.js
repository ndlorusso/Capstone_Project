const express = require("express");
const usersRouter = express.Router();
const JWT = process.env.JWT;
// const jwt = require('jsonwebtoken');

const {
  createUser,
  fetchAllUsers,
  // fetchOneUser,
  authenticateUser,
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

// TEST - CREATE USER
// /api/users/login
usersRouter.post("/login", async (req, res, next) => {
  const { email, password } = req.body;
  console.log(email, password);
  if (!email || !password) {
    next({
      name: "MissingCredentialsError",
      message: "Please supply both an email and password",
    });
    console.log("are we working");
  }
  try {
    // const user = 
    res.send(await authenticateUser(req.body));
    // console.log('user:', user);
    // if (user) {
    //   const token = jwt.sign(
    //     {
    //       id: user.id,
    //       email,
    //     },
    //     process.env.JWT,
    //     {
    //       expiresIn: "1w",
    //     }
    //   );

    //   res.send({
    //     message: "Login successful!",
    //     token,
    //   });
    // } else {
    //   next({
    //     name: "IncorrectCredentialsError",
    //     message: "Username or password is incorrect",
    //   });
    // }
  } catch (err) {
    next(err);
  }
});

// CREATE USER
// usersRouter.post("/register", async (req, res, next) => {
//   const { is_admin ,name, email, password } = req.body;

//   try {
//     const _user = await getUserByEmail(email);

//     if (_user) {
//       next({
//         name: "UserExistsError",
//         message: "A user with that email already exists",
//       });
//     }

//     const user = await createUser({
//       is_admin,
//       name,
//       email,
//       password,
//     });

//     const token = jwt.sign(
//       {
//         id: user.id,
//         email,
//       },
//       process.env.JWT_SECRET,
//       {
//         expiresIn: "1w",
//       }
//     );

//     res.send({
//       message: "Sign up successful!",
//       token,
//     });
//   } catch ({ name, message }) {
//     next({ name, message });
//   }
// });

module.exports = usersRouter;
