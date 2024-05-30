const express = require("express");
const shoesRouter = express.Router();
const { fetchAllShoes } = require("../db/shoes");

// GET ALL SHOES
shoesRouter.get("/", async (req, res, next) => {
  try {
    res.send(await fetchAllShoes());
  } catch (error) {
    next(error);
  }
});
// GET SHOES BY ID
shoesRouter.get("/api/shoes/:id", async (req, res, next) => {
  try {
    res.send(await fetchOneShoe(req.params.id));
  } catch (error) {
    next(error);
  }
});
// CREATE SHOES
shoesRouter.post("/api/shoes", async (req, res, next) => {
  try {
    res.send(await createShoe(req.body));
  } catch (error) {
    next(error);
  }
});
// UPDATE SHOES
shoesRouter.patch("/api/shoes/:id", async (req, res, next) => {
  try {
    res.send(await updateShoe(req.params.id, req.body));
  } catch (error) {
    next(error);
  }
});
//  DELETE SHOES
shoesRouter.delete("/api/shoes/:id", async (req, res, next) => {
  try {
    res.send(await deleteShoe(req.params.id));
  } catch (error) {
    next(error);
  }
});

module.exports = shoesRouter;
