const express = require('express')
const usersRouter = express.Router();
const apiRouter = express.Router();

const { fetchAllShoes } = require('../db');

// GET ALL SHOES - /api/shoes
// api router? or userRouter?
apiRouter.get('/', async (req, res, next) => {
    try {
        const shoes = await fetchAllShoes();
        res.send ({shoes});
    } catch (error) {
        next(error);
    }
});

// check /api/users??
module.exports = apiRouter;