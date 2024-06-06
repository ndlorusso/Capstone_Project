const express = require('express')
const shoesRouter = express.Router();
const { fetchAllShoes, fetchOneShoe, createShoe } = require('../db/shoes');

// GET ALL SHOES - /api/shoes
shoesRouter.get('/', async (req, res, next) => {
    try {
        res.send(await fetchAllShoes());
    } catch (error) {
        next(error);
    }
});

//GET ONE SHOE BY uuid
shoesRouter.get('/:id', async (req, res, next) => {
    try {
      res.send(await fetchOneShoe(req.params.id));
    } catch (error) {
      next(error);
    }
  });

// CREATE SHOES - POST WORKING - protecteod rute admin only
shoesRouter.post('/', async (req, res, next) => {
    try {
      res.send(await createShoe(req.body));
    } catch (error) {
      next(error);
    }
  });

// UPDATE SHOES
  shoesRouter.patch("/:id", async (req, res, next) => {
    try {
      res.send(await updateShoe(req.params.id, req.body));
    } catch (error) {
      next(error);
    }
  });

//  DELETE SHOES
  shoesRouter.delete("/:id", async (req, res, next) => {
    try {
      res.send(await deleteShoe(req.params.id));
    } catch (error) {
      next(error);
    }
  });

module.exports = shoesRouter;
