const express = require('express')
const shoesRouter = express.Router();
const { fetchAllShoes } = require('../db/shoes');

// GET ALL SHOES - /api/shoes
shoesRouter.get('/', async (req, res, next) => {
    try {
        res.send(await fetchAllShoes());
    } catch (error) {
        next(error);
    }
});

module.exports = shoesRouter;
