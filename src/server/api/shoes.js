const express = require("express");
const shoesRouter = express.Router();
const {
  fetchAllShoes,
  fetchOneShoe,
  createShoe,
  updateShoe,
  deleteShoe,
} = require("../db/shoes");

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

// <--------------- ADMIN ONLY , NEED TO TEST ----------------->
// UPDATE SHOES
// "200 OK" for patch - but no update on DB ?
// "200" OK for put - but no update on DB ?
shoesRouter.put("/:id", async (req, res, next) => {
  try {
    //   res.send(await updateShoe(req.body));
    res.send(await updateShoe(req.params.id, req.body));
    console.log("req.params.id:", req.params.id);
    console.log("req.body:", req.body);
  } catch (error) {
    next(error);

    // return , req.id, req.body;
    return req.body;
  }
});

// <--------------- ADMIN ONLY , NEED TO TEST ----------------->
// DELETE SHOES
shoesRouter.delete("/:id", async (req, res, next) => {
  try {
    res.send(await deleteShoe(req.params.id, req.body));
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
