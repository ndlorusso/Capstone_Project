const express = require('express');
const cartRouter = express.Router();
const { fetchUserCart,
        createCart,
        updateUserCart,
        createOrderItem,
} =    require('../db/cart');
const apiRouter = require('.');

// cartRouter.get('/:user_id', async (req, res, next) => {
cartRouter.get('/users/:id', async (req, res, next) => {
    try {
        res.send(await fetchUserCart());
    } catch (error) {
        next(error);
    }
});

// post order item to cart
// /api/cart/users/:id
cartRouter.post('/users/:id', async (req, res, next) => {
  const { quantity, price, shoe_id } = req.body;
  try {
    res.send(createOrderItem(req.body));
  } catch (error) {
    next(error);
  }
});

// Add to cart Button
// orderItem
// total price 
// quantity 
// shoeID
// <----------------------- ADD TO CART ----------------------->
// /api/cart/:id
// pass in --> users/:id/orderItem/:id = req.body
// apiRouter.post('/cart/:id'), async (req, res , next) => {
//   const { user_id, orderItem_id, total_price, quantity } = req.body;
//     try {
//         res.send(createOrderItem(req.body));
//     } catch (error) {
//         next(error)
//     }
// };

// 404 not found
cartRouter.put("/:user_id", async (req, res, next) => {
    try {
      res.send(await createCart(req.body));
    } catch (error) {
      next(error);
    }
  });

module.exports = cartRouter;