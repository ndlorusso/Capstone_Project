const express = require("express");
const shoesRouter = express.Router();
const { fetchAllShoes, fetchOneShoe, createShoe, updateShoe, deleteShoe } = require("../db/shoes");

// Middleware to check if user is admin
const isAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next(); // User is authenticated and is an admin
  } else {
    res.status(403).send({ error: "Access denied" }); // Forbidden
  }
};

// Middleware to require authentication
const requireAuth = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).send({ error: 'Authorization required' });
  }
  try {
    const token = authHeader.replace('Bearer ', '');
    const user = await findUserByToken(token);
    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
};

// GET ALL SHOES - /api/shoes
shoesRouter.get("/", async (req, res, next) => {
  try {
    res.send(await fetchAllShoes());
  } catch (error) {
    next(error);
  }
});

// GET ONE SHOE BY uuid - /api/shoes/:id
shoesRouter.get("/:id", async (req, res, next) => {
  try {
    const shoe = await fetchOneShoe(req.params.id);
    if (shoe) {
      res.json(shoe);
    } else {
      res.status(404).send({ error: "Shoe not found" });
    }
  } catch (error) {
    next(error);
  }
});

// CREATE SHOES - protected route admin only
shoesRouter.post("/", requireAuth, isAdmin, async (req, res, next) => {
  try {
    res.send(await createShoe(req.body));
  } catch (error) {
    next(error);
  }
});

// UPDATE SHOES - admin only
shoesRouter.put("/:id", requireAuth, isAdmin, async (req, res, next) => {
  try {
    const updatedShoe = await updateShoe(req.params.id, req.body);
    res.send(updatedShoe);
  } catch (error) {
    next(error);
  }
});

// DELETE SHOES - admin only
shoesRouter.delete("/:id", requireAuth, isAdmin, async (req, res, next) => {
  try {
    res.send(await deleteShoe(req.params.id));
  } catch (error) {
    next(error);
  }
});

module.exports = shoesRouter;
