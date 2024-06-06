const express = require('express');
const cartRouter = express.Router();
const { fetchUserCart } = require('../db/cart');

cartRouter.get('/:user_id', async (req, res, next) => {
    try {
        res.send(await fetchUserCart());
    } catch (error) {
        next(error);
    }
});

module.exports = cartRouter;