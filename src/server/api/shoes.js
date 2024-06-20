const express = require("express");
const shoesRouter = express.Router();
const {
  fetchAllShoes,
  fetchOneShoe,
  createShoe,
  updateShoe,
  deleteShoe,
} = require("../db/shoes");

const { createOrderItem,
} =    require('../db/cart');

// GET ALL SHOES - /api/shoes
// WORKING
shoesRouter.get("/", async (req, res, next) => {
  try {
    res.send(await fetchAllShoes());
  } catch (error) {
    next(error);
  }
});

//GET ONE SHOE BY uuid - /api/shoes/shoesId
// WORKING
shoesRouter.get("/:id", async (req, res, next) => {
  try {
    res.send(await fetchOneShoe(req.params.id));
  } catch (error) {
    next(error);
  }
});

// CREATE SHOES - protected route admin only
// POST WORKING! -
// {
// "brand": "{{$randomWord}}",
// "size": {{$randomInt}},
// "price": {{$randomInt}},
// "color": "{{$randomColor}}",
// "shoe_picture": "{{$randomImageUrl}}"
// }
shoesRouter.post("/", async (req, res, next) => {
  try {
    res.send(await createShoe(req.body));
  } catch (error) {
    next(error);
  }
});

// ADD SHOE to orderItem
shoesRouter.post("/:id/orderItem", async (req, res, next) => {
  try {
    res.send(await createOrderItem(req.body));
    console.log(req.body);
  } catch (error) {
    next(error);
  }
});

// <--------------- ADMIN ONLY , NEED TO TEST ----------------->
// UPDATE SHOES
// "200 OK" for patch - but no update on DB ?
// "200" OK for put - but no update on DB ?
// shoesRouter.put("/:id", async (req, res, next) => {
//   try {
//     console.log("req.params.id:", req.params.id);
//     console.log("req.body:", req.body);
//     res.send(await updateShoe(...req.body, req.params.id));
//     console.log("req.params.id:", req.params.id);
//     console.log("req.body:", req.body);
//   } catch (error) {
//     next(error);
//     // return , req.id, req.body;
//     // return req.body;
//   }
// });

shoesRouter.put("/:id", async (req, res, next) => {
  try {
    const updatedShoe = await updateShoe({
      ...req.body,
      id: req.params.id,
    });
    res.send(updatedShoe);
  } catch (error) {
    res.status(500).send({ error: 'Could not update shoe' });
  }
});

// <--------------- ADMIN ONLY , NEED TO TEST ----------------->
// DELETE SHOES
// 500 error
shoesRouter.delete("/:id", async (req, res, next) => {
  try {
    console.log("req.params.id:", req.params.id);
    console.log("req.body:", req.body);
    res.send(await deleteShoe(req.body));
  } catch (error) {
    next(error);
  }
});

// shoesRouter.get("/products", async (req, res) => {
//   try {
//     const result = await db.query("SELECT * FROM shoes");
//     res.json(result.rows);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

module.exports = shoesRouter;
