const express = require('express');
const cartRouter = express.Router();
const { fetchUserCart,
        createCart,
        updateUserCart,
        // createOrderItem,
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

// Add to cart Button
// orderItem
// total price 
// quantity 
// shoeID
// <----------------------- MIGHT NOT NEED ----------------------->
// apiRouter.post('/:users/:id/orderItem'), async (req, res , next) => {
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