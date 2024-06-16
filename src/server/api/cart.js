const express = require('express');
const cartRouter = express.Router();
const { fetchUserCart,
       updateUserCart,
} =    require('../db/cart');

// cartRouter.get('/:user_id', async (req, res, next) => {
cartRouter.get('/:user_id', async (req, res, next) => {
    try {
        res.send(await fetchUserCart());
    } catch (error) {
        next(error);
    }
});



// Edit (UPDATE) CART for SPECIFIC USER
cartRouter.put('/:user_id', async (req, res, next) => {
    try {
        res.send(await updateUserCart(req.body));
    } catch (error) {
        next(error);
    }
});



module.exports = cartRouter;