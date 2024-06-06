const id = require("volleyball/lib/id");
const db = require("./client");
const uuid = require("uuid");

// TEST FOR API.ROUTER
const express = require("express");
const apiRouter = express.Router();

// const { Client } = require("pg");

// CREATE
const createShoe = async ({ brand, size, price, color, shoe_picture }) => {
  const SQL = `--sql
    INSERT INTO shoes(id, brand, size, price, color, shoe_picture)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *
    `;
  const response = await db.query(SQL, [
    uuid.v4(),
    brand,
    size,
    price,
    color,
    shoe_picture,
  ]);
  return response.rows[0];
};

// READ ALL SHOES
const fetchAllShoes = async () => {
  const SQL = `--sql
  SELECT * from shoes
  `;
  const response = await db.query(SQL);
  return response.rows;
};

// READ SINGLE SHOE
const fetchOneShoe = async (id) => {
  const SQL = `--sql
  SELECT * from shoes
  WHERE id = $1
  `;
  const response = await db.query(SQL, [id]);
  return response.rows;
};

module.exports = {
  createShoe,
  fetchAllShoes,
  fetchOneShoe,
};
