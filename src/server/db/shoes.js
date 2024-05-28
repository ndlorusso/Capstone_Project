const db = require("./client");
const uuid = require("uuid");

const createShoe = async ({ brand, size, price, color }) => {
  const SQL = `--sql
    INSERT INTO shoes(id, brand, size, price, color)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *
    `;
  const response = await db.query(SQL, [uuid.v4(), brand, size, price, color]);
  return response.rows[0];
};
const updateShoe = async ({ id, brand, size, price, color }) => {
  const SQL = `--sql
      UPDATE shoes
      SET brand = $2, size = $3, price = $4, color = $5
      WHERE id = $1
      RETURNING *
      `;
  const response = await db.query(SQL, [id, brand, size, price, color]);
  return response.rows[0];
};

const deleteShoe = async (shoeId) => {
  const SQL = `--sql
      DELETE FROM shoes
      WHERE id = $1
      `;
  await db.query(SQL, [shoeId]);
};

module.exports = {
  createShoe,
  updateShoe,
  deleteShoe,
};
