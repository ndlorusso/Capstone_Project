const id = require("volleyball/lib/id");
const db = require("./client");
const uuid = require("uuid");
const { request } = require("express");

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

// CREATE FUNCTION - POST ROUTE
const createShoe = async ({ brand, size, price, color, shoe_picture }) => {
  //  console.log('hello lincoln');
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

// <--------------- ADMIN ONLY , NEED TO TEST ----------------->
// "200 OK" - but no update on DB ?
const updateShoe = async ({ brand, size, price, color, shoe_picture }) => {
  // console.log('hello lincoln');
  const SQL = `--sql
  UPDATE shoes 
  SET brand = $1, size = $2, price = $3, color = $4, shoe_picture = $5
  WHERE id = $6
  `;
  const response =
   await db.query(SQL, [
    uuid.v4(),
    brand,
    size,
    price,
    color,
    shoe_picture
  ]);
  console.log("response:", response);
  // return response;
};

// BRENDAN UPDATE SHOE
// const updateShoe = async ( { brand, size, price, color, shoe_picture }) => {
//   const SQL = `--sql
//     UPDATE shoes
//     SET brand = $2, size = $3, price = $4, color = $5, shoe_picture = $6
//     WHERE id = $1
//     RETURNING *
//     `;
//   const response = await db.query(SQL, [
//     uuid.v4(),
//     brand,
//     size,
//     price,
//     color,
//     shoe_picture,
//   ]);
//   console.log("response:", response);
//   // console.log("response:", response.rows[0]);
//   return response.rows;
// };

// <--------------- ADMIN ONLY , NEED TO TEST ----------------->
const deleteShoe = async ({ brand, size, price, color, shoe_picture }) => {
  const SQL = `--sql
  DELETE FROM shoes
  WHERE id = $1, brand = $2, size = $3, price = $4, color = $5, shoe_picture = $6
  `;
  console.log("SQL:", SQL);
  const response = 
  await db.query(SQL, [
    uuid.v4(),
    brand,
    size,
    price,
    color,
    shoe_picture
  ]);
  console.log("response:", response);
  return response.rows[0];
};

module.exports = {
  createShoe,
  fetchAllShoes,
  fetchOneShoe,
  updateShoe,
  deleteShoe,
};
