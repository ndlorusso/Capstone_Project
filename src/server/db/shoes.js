const db = require("./client");
const uuid = require('uuid');

// CREATE FUNCTION
const createShoe = async ({ brand, size, price, color}) => {
    const SQL = `--sql
    INSERT INTO shoes(id, brand, size, price, color)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *
    `;
    const response = await db.query(SQL, [uuid.v4(), brand, size, price, color]);
    return response.rows[0];
  };

  module.exports = {
    createShoe,
  };