const express = require("express");
const apiRouter = express.Router();
const jwt = require("jsonwebtoken");
const { findUserByToken } = require("./users");
const volleyball = require("volleyball");
apiRouter.use(volleyball);

apiRouter.use(async (req, res, next) => {
  const auth = req.header("Authorization"); 

  if (!auth) {
    next();
  } else if (auth.startsWith("Bearer ")) {
    const token = auth.slice(7);
    console.log("token:", token);

    try {
      next();
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

const cartRouter = require("./cart");
apiRouter.use("/cart", cartRouter);

apiRouter.use((err, req, res, next) => {
  res.status(500).send(err);
});

module.exports = apiRouter;
