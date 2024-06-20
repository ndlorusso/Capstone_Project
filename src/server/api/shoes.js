const express = require("express");
const shoesRouter = express.Router();
const { fetchAllShoes, fetchOneShoe, createShoe, updateShoe, deleteShoe } = require("../db/shoes");
const { createOrderItem,
} = require('../db/cart');
// Middleware to check if user is admin
// const isAdmin = (req, res, next) => {
//   if (req.user && req.user.isAdmin) {
//     next(); // User is authenticated and is an admin
//   } else {
//     res.status(403).send({ error: "Access denied" }); // Forbidden
//   }
// };

// Middleware to require authentication
const requireAuth = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).send({ error: 'Authorization required' });
  }
  try {
    const token = authHeader.replace('Bearer ', '');
    const user = await findUserByToken(token);
    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
};

// GET ALL SHOES - /api/shoes
shoesRouter.get("/", async (req, res, next) => {
  try {
    res.send(await fetchAllShoes());
  } catch (error) {
    next(error);
  }
});

// GET ONE SHOE BY uuid - /api/shoes/:id
shoesRouter.get("/:id", async (req, res, next) => {
  try {
    const shoe = await fetchOneShoe(req.params.id);
    if (shoe) {
      res.json(shoe);
    } else {
      res.status(404).send({ error: "Shoe not found" });
    }
  } catch (error) {
    next(error);
  }
});

// CREATE SHOES - protected route admin only
shoesRouter.post("/", requireAuth, isAdmin, async (req, res, next) => {
  try {
    res.send(await createShoe(req.body));
  } catch (error) {
    next(error);
  }
});

// ADD SHOE to orderItem
shoesRouter.post("/:id/orderItem", async (req, res, next) => {
  try {
    res.send(await createOrderItem(req.body));
    console.log(req.body);
  } catch (error) {
    next(error);
  }
});

// <--------------- ADMIN ONLY , NEED TO TEST ----------------->
// UPDATE SHOES
// "200 OK" for patch - but no update on DB ?
// "200" OK for put - but no update on DB ?
// shoesRouter.put("/:id", async (req, res, next) => {
//   try {
//     console.log("req.params.id:", req.params.id);
//     console.log("req.body:", req.body);
//     res.send(await updateShoe(...req.body, req.params.id));
//     console.log("req.params.id:", req.params.id);
//     console.log("req.body:", req.body);
//   } catch (error) {
//     next(error);
//     // return , req.id, req.body;
//     // return req.body;
//   }
// });

shoesRouter.put("/:id", async (req, res, next) => {
  try {
    const updatedShoe = await updateShoe({
      ...req.body,
      id: req.params.id,
    });
    res.send(updatedShoe);
  } catch (error) {
    res.status(500).send({ error: 'Could not update shoe' });
  }
});

// <--------------- ADMIN ONLY , NEED TO TEST ----------------->
// DELETE SHOES
// 500 error
shoesRouter.delete("/:id", async (req, res, next) => {
  try {
    console.log("req.params.id:", req.params.id);
    console.log("req.body:", req.body);
    res.send(await deleteShoe(req.body));
    
// UPDATE SHOES - admin only
shoesRouter.put("/:id", requireAuth, isAdmin, async (req, res, next) => {
  try {
    const updatedShoe = await updateShoe(req.params.id, req.body);
    res.send(updatedShoe);
  } catch (error) {
    next(error);
  }
});

// DELETE SHOES - admin only
shoesRouter.delete("/:id", requireAuth, isAdmin, async (req, res, next) => {
  try {
    res.send(await deleteShoe(req.params.id));
  } catch (error) {
    next(error);
  }
});

module.exports = shoesRouter;
