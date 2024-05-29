const express = require('express')
const usersRouter = express.Router();
const apiRouter = express.Router();

const { fetchAllShoes } = require('../db/shoes');

// GET ALL SHOES - /api/shoes
// api router? or userRouter? - not NICK CODE
// apiRouter.get('/', async (req, res, next) => {
//     try {
//         const shoes = await fetchAllShoes();
//         res.send ({shoes});
//     } catch (error) {
//         next(error);
//     }
// });

// GET ALL SHOES - /api/shoes - NICK CODE
apiRouter.get('/', async (req, res, next) => {
    try {
        res.send(await fetchAllShoes());
    } catch (error) {
        next(error);
    }
});

// check /api/users??
module.exports = apiRouter;
module.exports = usersRouter;