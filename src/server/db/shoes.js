const db = require("./client");
const uuid = require("uuid");

// READ ALL SHOES
const fetchAllShoes = async () => {
  const SQL = `SELECT * FROM shoes`;
  const response = await db.query(SQL);
  return response.rows;
};

// READ SINGLE SHOE
const fetchOneShoe = async (id) => {
  const SQL = `SELECT * FROM shoes WHERE id = $1`;
  const response = await db.query(SQL, [id]);
  return response.rows[0];
};

// CREATE FUNCTION - POST ROUTE 
const createShoe = async ({ brand, size, price, color, shoe_picture }) => {
  const SQL = `INSERT INTO shoes(id, brand, size, price, color, shoe_picture) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`;
  const response = await db.query(SQL, [uuid.v4(), brand, size, price, color, shoe_picture]);
  return response.rows[0];
};

// UPDATE SHOE - admin only
const updateShoe = async (id, { brand, size, price, color, shoe_picture }) => {
  const SQL = `UPDATE shoes SET brand = $2, size = $3, price = $4, color = $5, shoe_picture = $6 WHERE id = $1 RETURNING *`;
  const response = await db.query(SQL, [id, brand, size, price, color, shoe_picture]);
  return response.rows[0];
};

// DELETE SHOE - admin only
const deleteShoe = async (id) => {
  const SQL = `DELETE FROM shoes WHERE id = $1 RETURNING *`;
  const response = await db.query(SQL, [id]);
  return response.rows[0];
};

module.exports = {
  createShoe,
  fetchAllShoes,
  fetchOneShoe,
  updateShoe,
  deleteShoe,
};
