const express = require('express')
const usersRouter = express.Router();
const apiRouter = express.Router();

const { fetchAllShoes } = require('../db');

usersRouter.get('/', async (req, res, next) => {
    try {
        const shoes = await fetchAllShoes();
        res.send ({shoes});
    } catch (error) {
        next(error);
    }
});