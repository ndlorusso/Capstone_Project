const db = require("./client");

const createShoe = async ({ brand, model, color, condition, price, userId }) => {
    const SQL = `--sql
    INSERT INTO shoes(id, brand, model, color, condition, price, userId)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING *
    `;
    const response = await db.query(SQL, [uuid.v4(), brand, model, color, condition, price, userId]);
    return response.rows[0];
  };