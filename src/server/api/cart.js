const express = require("express");
const cartRouter = express.Router();
const apiRouter = express.Router();
// const orderItemRouter = express.Router();

const {
  fetchUserCart,
  createCart,
  updateUserCart,
  fetchAllOrderItems,
  fetchOrderItem,
  createOrderItem,
  deleteOrderItem,
} = require("../db/cart");

const {  findUserByToken }
= require("../db/users");

// MIDDLEWARE
const isLoggedIn = async (req, res, next ) => {
  console.log('licnoln'); // code not hitting here
  try {
    console.log("req.headers:", req.headers);
    req.user = await findUserByToken(req.headers.authorization);
    next();
  } catch (error) {
    console.log("Error: is Not logged in?");
  }
};

// cartRouter.get('/:user_id', async (req, res, next) => {
cartRouter.get("/users/:id", async (req, res, next) => {
  try {
    res.send(await fetchUserCart());
  } catch (error) {
    next(error);
  }
});

// post shoes to order items
// /api/cart/users/:id
//
cartRouter.post("/users/:id", isLoggedIn, async (req, res, next) => {
  const { quantity, price, shoe_id } = req.body;
  console.log("are we there yet?"); // not hitting
  try {
    res.send(createOrderItem(req.body));
  } catch (error) {
    next(error);
  }
});

// FETCH ALL OrderItems
cartRouter.get("/orderItem", async (req, res, next) => {
  try {
    res.send(await fetchAllOrderItems());
  } catch (error) {
    next(error);
  }
});

// how to get newly posted orderItem iD
cartRouter.get("/orderItem/:id", async (req, res, next) => {
  try {
    res.send(await fetchOrderItem(req.params.id));
  } catch (error) {
    next(error);
  }
});

// Delete an order item
cartRouter.delete("/orderItem/:id", async (req, res, next) => {
  try {
    res.send(await deleteOrderItem(req.params.id));
  } catch (error) {
    next(error);
  }
});

// CHECKOUT Button
// ADD orderItems to CART, POST
// total price, orderItem_id, user_id
// <----------------------- ADD TO CART ----------------------->
// /api/cart/:id
cartRouter.post('/orderItem/:id'), async (req, res , next) => {
  const { user_id, orderItem_id, total_price, quantity } = req.body;
    try {
        res.send(createOrderItem(req.body));
    } catch (error) {
        next(error)
    }
};

// 404 not found
cartRouter.put("/:user_id", async (req, res, next) => {
  try {
    res.send(await createCart(req.body));
  } catch (error) {
    next(error);
  }
});

module.exports = cartRouter;
