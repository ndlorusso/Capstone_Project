const db = require("./client");
const uuid = require('uuid');

const createCart = async ({ total_price, user_id}) => {
    const SQL = `--sql
    INSERT INTO cart(id, total_price, user_id)
    VALUES ($1, $2, $3)
    RETURNING *
    `;
    const response = await db.query(SQL, [uuid.v4(), total_price, user_id]);
    return response.rows[0];
  };

module.exports = {
    createCart,
};