const express = require("express");
const apiRouter = express.Router();
const jwt = require("jsonwebtoken");
const { findUserByToken } = require("./users");
const volleyball = require("volleyball");
apiRouter.use(volleyball);

// TO BE COMPLETED - set `req.user` if possible, using token sent in the request header
apiRouter.use(async (req, res, next) => {
  const auth = req.header("Authorization"); //auth header

  if (!auth) {
    next();
  } else if (auth.startsWith("Bearer ")) {
    // TODO - Get JUST the token out of 'auth'
    const token = auth.slice(7);
    console.log("token:", token);

    try {
      // const parsedToken = jwt.verify(token, process.env.JWT);
      // console.log("parsedToken:", parsedToken);
      // if (parsedToken && parsedToken.id) {
      //   console.log("token?", token);
      //   // const user = await findUserByToken(token);
      //   // console.log("user:", user);
      //   req.user = user;
      // }
      next();
      // TODO - Call 'jwt.verify()' to see if the token is valid. If it is, use it to get the user's 'id'. Look up the user with their 'id' and set 'req.user'
    } catch (error) {
      console.log("lincoln:");
      next(error);
    }
  } else {
    next({
      name: "AuthorizationHeaderError",
      message: `Authorization token must start with 'Bearer'`,
    });
  }
});

const usersRouter = require("./users");
apiRouter.use("/users", usersRouter);

const shoesRouter = require("./shoes");
apiRouter.use("/shoes", shoesRouter);

// /api/cart
const cartRouter = require("./cart");
apiRouter.use("/cart", cartRouter);

// const orderItemRouter
// const orderItemRouter = require('./orderItem');
// apiRouter.use('/orderItem', orderItem);

apiRouter.use((err, req, res, next) => {
  res.status(500).send(err);
});

module.exports = apiRouter;
